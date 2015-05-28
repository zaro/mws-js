# ----------------------------------------------------------
#  mws-js • feeds.coffee • by robbie saunders [eibbors.com]
# ----------------------------------------------------------
# Module containing Amazon's newer Fulfillment service APIs
# ----------------------------------------------------------

fs = require 'fs'
mws = require("./core")
iconv = require('iconv-lite')

MWS_LOCALES = mws.LOCALES

MWS_FEEDS = new mws.Service
    name: "Feeds"
    group: "Feeds"
    path: "/"
    version: "2009-01-01"
    legacy: true

types =
  FeedTypes:
    XML: [
      '_POST_PRODUCT_DATA_'
      '_POST_PRODUCT_RELATIONSHIP_DATA_'
      '_POST_ITEM_DATA_'
      '_POST_PRODUCT_OVERRIDES_DATA_'
      '_POST_PRODUCT_IMAGE_DATA_'
      '_POST_PRODUCT_PRICING_DATA_'
      '_POST_INVENTORY_AVAILABILITY_DATA_'
      '_POST_ORDER_ACKNOWLEDGEMENT_DATA_'
      '_POST_ORDER_FULFILLMENT_DATA_'
      '_POST_FULFILLMENT_ORDER_REQUEST_DATA_'
      '_POST_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA_'
      '_POST_PAYMENT_ADJUSTMENT_DATA_'
    ]
    Flat: [
      '_POST_FLAT_FILE_LISTINGS_DATA_'
      '_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_'
      '_POST_FLAT_FILE_FULFILLMENT_DATA_'
      '_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_'
      '_POST_FLAT_FILE_INVLOADER_DATA_'
      '_POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_'
      '_POST_FLAT_FILE_BOOKLOADER_DATA_'
      '_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_'
    ]
    Other: [
      '_POST_UIEE_BOOKLOADER_DATA_'
    ]

  FeedTypeFormats:
    _POST_PRODUCT_DATA_: 'XML'
    _POST_PRODUCT_RELATIONSHIP_DATA_: 'XML'
    _POST_ITEM_DATA_: 'XML'
    _POST_PRODUCT_OVERRIDES_DATA_: 'XML'
    _POST_PRODUCT_IMAGE_DATA_: 'XML'
    _POST_PRODUCT_PRICING_DATA_: 'XML'
    _POST_INVENTORY_AVAILABILITY_DATA_: 'XML'
    _POST_ORDER_ACKNOWLEDGEMENT_DATA_: 'XML'
    _POST_ORDER_FULFILLMENT_DATA_: 'XML'
    _POST_FULFILLMENT_ORDER_REQUEST_DATA_: 'XML'
    _POST_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA_: 'XML'
    _POST_PAYMENT_ADJUSTMENT_DATA_: 'XML'
    _POST_FLAT_FILE_LISTINGS_DATA_: 'FlatFile'
    _POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_: 'FlatFile'
    _POST_FLAT_FILE_FULFILLMENT_DATA_: 'FlatFile'
    _POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_: 'FlatFile'
    _POST_FLAT_FILE_INVLOADER_DATA_: 'FlatFile'
    _POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_: 'FlatFile'
    _POST_FLAT_FILE_BOOKLOADER_DATA_: 'FlatFile'
    _POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_: 'FlatFile'
    _POST_UIEE_BOOKLOADER_DATA_: 'UIEE'

  FeedProcessingStatus:
    _SUBMITTED_: 'Submitted'
    _IN_PROGRESS_: 'In Progress'
    _CANCELLED_: 'Cancelled'
    _DONE_: 'Done'

enums = exports.enums =
  FeedProcessingStatus: class extends mws.Enum
    constructor: (required, init) ->
      super 'FeedProcessingStatus', ["_SUBMITTED_", "_IN_PROGRESS_", "_CANCELLED_", "_DONE_"]

  FeedTypeList: class extends mws.EnumList
    constructor: (required, init) ->
      super 'FeedTypeList', 'Type', (k for k,v of types.FeedTypeFormats) , required, init

  FeedProcessingStatusList: class extends mws.EnumList
    constructor: (required, init) ->
      super('FeedProcessingStatusList', 'Status', [ 'FillOrKill', 'FillAll', 'FillAllAvailable' ], required ? false)

# requests ns
requests =

  GetServiceStatus: class extends mws.Request
    constructor: (init) ->
      super MWS_ORDERS, 'GetServiceStatus', [], {}, null, init

  CancelFeedSubmissions: class extends mws.Request
    constructor: (init) ->
      super MWS_FEEDS, "CancelFeedSubmissions", [
        new mws.ParamList('FeedSubmissionIdList', 'Id')
        new enums.FeedTypeList()
        new mws.Timestamp('SubmittedFromDate')
        new mws.Timestamp('SubmittedToDate')
      ], {}, null, init

  GetFeedSubmissionList: class extends mws.Request
    constructor: (init) ->
      super MWS_FEEDS, "GetFeedSubmissionList", [
        new mws.ParamList('FeedSubmissionIdList', 'Id')
        new mws.Param('MaxCount')
        new enums.FeedTypeList()
        new enums.FeedProcessingStatusList()
        new mws.Timestamp('SubmittedFromDate')
        new mws.Timestamp('SubmittedToDate')
      ], {}, null, init

  GetFeedSubmissionListByNextToken: class extends mws.Request
    constructor: (init) ->
      super MWS_FEEDS, "GetFeedSubmissionListByNextToken", [
        new mws.Param('NextToken', true)
      ], {}, null, init

  GetFeedSubmissionCount: class extends mws.Request
    constructor: (init) ->
      super MWS_FEEDS, "GetFeedSubmissionCount", [
        new enums.FeedTypeList()
        new enums.FeedProcessingStatusList()
        new mws.Timestamp('SubmittedFromDate')
        new mws.Timestamp('SubmittedToDate')
      ], {}, null, init

  GetFeedSubmissionResult: class extends mws.Request
    constructor: (init) ->
      super MWS_FEEDS, "GetFeedSubmissionResult", [
        new mws.Param('FeedSubmissionId', true)
      ], {}, null, init

  SubmitFeed: class extends mws.Request
    constructor: (init, body) ->
      super MWS_FEEDS, "SubmitFeed", [
        new mws.Param('FeedType', true)
        new mws.ParamList('MarketplaceIdList', 'Id')
        new mws.Bool('PurgeAndReplace')
      ], {}, body ? init?.body ? null, init
      if @FeedType? in types.FeedTypes.XML
        @headers['content-type'] = "text/xml"
      else
        @headers['content-type'] = "text/tab-separated-values"

    # Sync. helper for loading an existing feed from the file ststem
    attachFile: (filename, format, encoding, cb) ->
      unless format?
        if /\.xml$/gi.test(filename) or @FeedType? in types.FeedTypes.XML
          format = "text/xml"
        else
          format = "text"
      if typeof cb is 'function'
        fs.readFile filename, encoding, (err, data) =>
          if err then throw err
          else @attach data, format, e
      else
        @attach fs.readFileSync filename, format

# New client class providing more convenient access to service via camelCased
# versions of the request as methods.
class FeedsClient extends mws.Client

  # The standard mws GetServiceStatus request. Callback function should be of the form
  # (status, response) -> # ...
  getServiceStatus: (cb) ->
    @invoke new requests.GetServiceStatus(), {}, (res) =>
      status = res.result?.Status ? null
      cb status, res

  # Cancel one or more previous submissions
  cancelFeedSubmissions: (submissionIds, feedTypes, submittedFrom, submittedTo, cb) ->
    req = new requests.CancelFeedSubmissions
      FeedSubmissionIdList: submissionIds ? []
      FeedTypeList: feedTypes ? []
      SubmittedFromDate: submittedFrom
      SubmittedToDate:   submittedTo
    @invoke req, {}, (res) =>
      # TODO: test and parse
      if typeof cb is 'function' then cb res

  # Optional Parameters:
  # FeedSubmissionIdList, FeedTypeList, FeedProcessingStatusList,
  # SubmittedFromDate, SubmittedToDate, MaxCount
  getFeedSubmissionList: (options={}, cb) ->
    req = new requests.GetFeedSubmissionList options
    @invoke req,  { nextTokenCall: requests.GetFeedSubmissionListByNextToken }, (res) =>
      # TODO: test and parse
      if typeof cb is 'function' then cb res

  # Request next page of feed submissions listed in GetFeedSubmissionListResult
  getFeedSubmissionListByNextToken: (token, cb) ->
    req = new requests.GetFeedSubmissionListByNextToken(NextToken: token)
    @invoke req,  { nextTokenCall: requests.GetFeedSubmissionListByNextToken }, (res) =>
      # TODO: test and parse
      if typeof cb is 'function' then cb res

  # Works as expected, same parameters as cancel request
  getFeedSubmissionCount: (feedTypes, statusList, submittedFrom, submittedTo, cb) ->
    req = new requests.GetFeedSubmissionCount
        FeedTypeList: feedTypes
        FeedProcessingStatusList: statusList
        SubmittedFromDate: submittedFrom
        SubmittedToDate: submittedTo
    @invoke req, {}, (res) =>
      # TODO: test and parse
      if typeof cb is 'function' then cb res

  # Fetch any errors or results in response to feed submission (by id)
  getFeedSubmissionResult: (id, cb) ->
    req = new requests.GetFeedSubmissionResult FeedSubmissionId: id
    @invoke req, {}, (res) =>
      # TODO: test and parse
      if typeof cb is 'function' then cb res

  # Upload feed data for submission
  submitFeed: (feedType, feedBody, marketplaces, purgeReplace=false, cb) =>
    req = new requests.SubmitFeed
      FeedType: feedType
      MarketplaceIdList: marketplaces ? @marketplaceIds ? [@marketplaceId]
      PurgeAndReplace: purgeReplace
    , feedBody

    @invoke req, {}, (res) =>
      # TODO: test and parse
      if typeof cb is 'function' then cb res

class XMLFeeds
	constructor: (options={})->
		@builder = require('xmlbuilder')
		@merchantId = options.merchantId ? null
		if typeof options.locale is 'object'
			@currency = options.locale.currency
			@encoding = options.locale.charset
		else
			@currency = MWS_LOCALES[options.locale].currency
			@encoding = MWS_LOCALES[options.locale].charset

	# generate XML for the Order Fulfillment feed
	orderFulfillment: (orders)->
		xml = @builder.create('AmazonEnvelope', {encoding: @encoding})
		xml.att('xmlns:xsi',"http://www.w3.org/2001/XMLSchema-instance")
		xml.att('xsi:noNamespaceSchemaLocation',"amzn-envelope.xsd")
		head = xml.e('Header')
		head.e('DocumentVersion','1.01')
		head.e('MerchantIdentifier',@merchantID)
		xml.e('MessageType','OrderFulfillment')
		cnt = 1
		for o in orders
			m = xml.e('Message')
			m.e('MessageID','' + cnt++)
			f = m.e('OrderFulfillment')
			for a in ['AmazonOrderID','MerchantOrderID','MerchantFulfillmentID']
				f.e(a,o[a]) if o[a]
			if o.FulfillmentDate
				f.e('FulfillmentDate',o.FulfillmentDate)
			else
				f.e('FulfillmentDate',new Date().toISOString())
			if o.FulfillmentData
				fd = f.e('FulfillmentData',o.FulfillmentData)
				for a in ['CarrierCode','CarrierName','ShippingMethod','ShipperTrackingNumber']
					fd.e(a,o.FulfillmentData[a]) if o.FulfillmentData[a]
			items = if Array.isArray(o.Item) then o.Item else [ o.Item ]
			for i in items
				it = f.e('Item')
				for a in ['AmazonOrderItemCode','MerchantOrderItemID','MerchantFulfillmentItemID','Quantity']
					it.e(a,i[a]) if i[a]
		return iconv.encode( xml.end({ pretty: true}), @encoding)

	# generate XML for the Pricing feed
	productPricing: (items)->
		unless Array.isArray(items)
			items = [ items ]
		xml = @builder.create('AmazonEnvelope', {encoding: @encoding})
		xml.att('xmlns:xsi',"http://www.w3.org/2001/XMLSchema-instance")
		xml.att('xsi:noNamespaceSchemaLocation',"amzn-envelope.xsd")
		head = xml.e('Header')
		head.e('DocumentVersion','1.01')
		head.e('MerchantIdentifier',@merchantId)
		xml.e('MessageType','Price')
		cnt = 1
		for item in items
			m = xml.e('Message')
			m.e('MessageID','' + cnt++)
			f = m.e('Price')
			f.e('SKU',item['SKU']) if item['SKU']
			for a in ['StandardPrice','MAP']
				f.e(a,{currency: item['Currency'] ? @currency},item[a]) if item[a]
		return iconv.encode( xml.end({ pretty: true}), @encoding)

module.exports =
  service: MWS_FEEDS
  enums: enums
  types: types
  requests: requests
  Client: FeedsClient
  XMLFeeds: XMLFeeds
