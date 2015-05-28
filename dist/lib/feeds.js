var FeedsClient, MWS_FEEDS, MWS_LOCALES, XMLFeeds, enums, fs, iconv, mws, requests, types,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

fs = require('fs');

mws = require("./core");

iconv = require('iconv-lite');

MWS_LOCALES = mws.LOCALES;

MWS_FEEDS = new mws.Service({
  name: "Feeds",
  group: "Feeds",
  path: "/",
  version: "2009-01-01",
  legacy: true
});

types = {
  FeedTypes: {
    XML: ['_POST_PRODUCT_DATA_', '_POST_PRODUCT_RELATIONSHIP_DATA_', '_POST_ITEM_DATA_', '_POST_PRODUCT_OVERRIDES_DATA_', '_POST_PRODUCT_IMAGE_DATA_', '_POST_PRODUCT_PRICING_DATA_', '_POST_INVENTORY_AVAILABILITY_DATA_', '_POST_ORDER_ACKNOWLEDGEMENT_DATA_', '_POST_ORDER_FULFILLMENT_DATA_', '_POST_FULFILLMENT_ORDER_REQUEST_DATA_', '_POST_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA_', '_POST_PAYMENT_ADJUSTMENT_DATA_'],
    Flat: ['_POST_FLAT_FILE_LISTINGS_DATA_', '_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_', '_POST_FLAT_FILE_FULFILLMENT_DATA_', '_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_', '_POST_FLAT_FILE_INVLOADER_DATA_', '_POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_', '_POST_FLAT_FILE_BOOKLOADER_DATA_', '_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_'],
    Other: ['_POST_UIEE_BOOKLOADER_DATA_']
  },
  FeedTypeFormats: {
    _POST_PRODUCT_DATA_: 'XML',
    _POST_PRODUCT_RELATIONSHIP_DATA_: 'XML',
    _POST_ITEM_DATA_: 'XML',
    _POST_PRODUCT_OVERRIDES_DATA_: 'XML',
    _POST_PRODUCT_IMAGE_DATA_: 'XML',
    _POST_PRODUCT_PRICING_DATA_: 'XML',
    _POST_INVENTORY_AVAILABILITY_DATA_: 'XML',
    _POST_ORDER_ACKNOWLEDGEMENT_DATA_: 'XML',
    _POST_ORDER_FULFILLMENT_DATA_: 'XML',
    _POST_FULFILLMENT_ORDER_REQUEST_DATA_: 'XML',
    _POST_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA_: 'XML',
    _POST_PAYMENT_ADJUSTMENT_DATA_: 'XML',
    _POST_FLAT_FILE_LISTINGS_DATA_: 'FlatFile',
    _POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_: 'FlatFile',
    _POST_FLAT_FILE_FULFILLMENT_DATA_: 'FlatFile',
    _POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_: 'FlatFile',
    _POST_FLAT_FILE_INVLOADER_DATA_: 'FlatFile',
    _POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_: 'FlatFile',
    _POST_FLAT_FILE_BOOKLOADER_DATA_: 'FlatFile',
    _POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_: 'FlatFile',
    _POST_UIEE_BOOKLOADER_DATA_: 'UIEE'
  },
  FeedProcessingStatus: {
    _SUBMITTED_: 'Submitted',
    _IN_PROGRESS_: 'In Progress',
    _CANCELLED_: 'Cancelled',
    _DONE_: 'Done'
  }
};

enums = exports.enums = {
  FeedProcessingStatus: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required, init) {
      _Class.__super__.constructor.call(this, 'FeedProcessingStatus', ["_SUBMITTED_", "_IN_PROGRESS_", "_CANCELLED_", "_DONE_"]);
    }

    return _Class;

  })(mws.Enum),
  FeedTypeList: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required, init) {
      var k, v;
      _Class.__super__.constructor.call(this, 'FeedTypeList', 'Type', (function() {
        var ref, results;
        ref = types.FeedTypeFormats;
        results = [];
        for (k in ref) {
          v = ref[k];
          results.push(k);
        }
        return results;
      })(), required, init);
    }

    return _Class;

  })(mws.EnumList),
  FeedProcessingStatusList: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required, init) {
      _Class.__super__.constructor.call(this, 'FeedProcessingStatusList', 'Status', ['FillOrKill', 'FillAll', 'FillAllAvailable'], required != null ? required : false);
    }

    return _Class;

  })(mws.EnumList)
};

requests = {
  GetServiceStatus: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_ORDERS, 'GetServiceStatus', [], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  CancelFeedSubmissions: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_FEEDS, "CancelFeedSubmissions", [new mws.ParamList('FeedSubmissionIdList', 'Id'), new enums.FeedTypeList(), new mws.Timestamp('SubmittedFromDate'), new mws.Timestamp('SubmittedToDate')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetFeedSubmissionList: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_FEEDS, "GetFeedSubmissionList", [new mws.ParamList('FeedSubmissionIdList', 'Id'), new mws.Param('MaxCount'), new enums.FeedTypeList(), new enums.FeedProcessingStatusList(), new mws.Timestamp('SubmittedFromDate'), new mws.Timestamp('SubmittedToDate')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetFeedSubmissionListByNextToken: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_FEEDS, "GetFeedSubmissionListByNextToken", [new mws.Param('NextToken', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetFeedSubmissionCount: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_FEEDS, "GetFeedSubmissionCount", [new enums.FeedTypeList(), new enums.FeedProcessingStatusList(), new mws.Timestamp('SubmittedFromDate'), new mws.Timestamp('SubmittedToDate')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetFeedSubmissionResult: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_FEEDS, "GetFeedSubmissionResult", [new mws.Param('FeedSubmissionId', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  SubmitFeed: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init, body) {
      var ref, ref1;
      _Class.__super__.constructor.call(this, MWS_FEEDS, "SubmitFeed", [new mws.Param('FeedType', true), new mws.ParamList('MarketplaceIdList', 'Id'), new mws.Bool('PurgeAndReplace')], {}, (ref = body != null ? body : init != null ? init.body : void 0) != null ? ref : null, init);
      if (ref1 = this.FeedType != null, indexOf.call(types.FeedTypes.XML, ref1) >= 0) {
        this.headers['content-type'] = "text/xml";
      } else {
        this.headers['content-type'] = "text/tab-separated-values";
      }
    }

    _Class.prototype.attachFile = function(filename, format, encoding, cb) {
      var ref;
      if (format == null) {
        if (/\.xml$/gi.test(filename) || (ref = this.FeedType != null, indexOf.call(types.FeedTypes.XML, ref) >= 0)) {
          format = "text/xml";
        } else {
          format = "text";
        }
      }
      if (typeof cb === 'function') {
        return fs.readFile(filename, encoding, (function(_this) {
          return function(err, data) {
            if (err) {
              throw err;
            } else {
              return _this.attach(data, format, e);
            }
          };
        })(this));
      } else {
        return this.attach(fs.readFileSync(filename, format));
      }
    };

    return _Class;

  })(mws.Request)
};

FeedsClient = (function(superClass) {
  extend(FeedsClient, superClass);

  function FeedsClient() {
    this.submitFeed = bind(this.submitFeed, this);
    return FeedsClient.__super__.constructor.apply(this, arguments);
  }

  FeedsClient.prototype.getServiceStatus = function(cb) {
    return this.invoke(new requests.GetServiceStatus(), {}, (function(_this) {
      return function(res) {
        var ref, ref1, status;
        status = (ref = (ref1 = res.result) != null ? ref1.Status : void 0) != null ? ref : null;
        return cb(status, res);
      };
    })(this));
  };

  FeedsClient.prototype.cancelFeedSubmissions = function(submissionIds, feedTypes, submittedFrom, submittedTo, cb) {
    var req;
    req = new requests.CancelFeedSubmissions({
      FeedSubmissionIdList: submissionIds != null ? submissionIds : [],
      FeedTypeList: feedTypes != null ? feedTypes : [],
      SubmittedFromDate: submittedFrom,
      SubmittedToDate: submittedTo
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        if (typeof cb === 'function') {
          return cb(res);
        }
      };
    })(this));
  };

  FeedsClient.prototype.getFeedSubmissionList = function(options, cb) {
    var req;
    if (options == null) {
      options = {};
    }
    req = new requests.GetFeedSubmissionList(options);
    return this.invoke(req, {
      nextTokenCall: requests.GetFeedSubmissionListByNextToken
    }, (function(_this) {
      return function(res) {
        if (typeof cb === 'function') {
          return cb(res);
        }
      };
    })(this));
  };

  FeedsClient.prototype.getFeedSubmissionListByNextToken = function(token, cb) {
    var req;
    req = new requests.GetFeedSubmissionListByNextToken({
      NextToken: token
    });
    return this.invoke(req, {
      nextTokenCall: requests.GetFeedSubmissionListByNextToken
    }, (function(_this) {
      return function(res) {
        if (typeof cb === 'function') {
          return cb(res);
        }
      };
    })(this));
  };

  FeedsClient.prototype.getFeedSubmissionCount = function(feedTypes, statusList, submittedFrom, submittedTo, cb) {
    var req;
    req = new requests.GetFeedSubmissionCount({
      FeedTypeList: feedTypes,
      FeedProcessingStatusList: statusList,
      SubmittedFromDate: submittedFrom,
      SubmittedToDate: submittedTo
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        if (typeof cb === 'function') {
          return cb(res);
        }
      };
    })(this));
  };

  FeedsClient.prototype.getFeedSubmissionResult = function(id, cb) {
    var req;
    req = new requests.GetFeedSubmissionResult({
      FeedSubmissionId: id
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        if (typeof cb === 'function') {
          return cb(res);
        }
      };
    })(this));
  };

  FeedsClient.prototype.submitFeed = function(feedType, feedBody, marketplaces, purgeReplace, cb) {
    var ref, req;
    if (purgeReplace == null) {
      purgeReplace = false;
    }
    req = new requests.SubmitFeed({
      FeedType: feedType,
      MarketplaceIdList: (ref = marketplaces != null ? marketplaces : this.marketplaceIds) != null ? ref : [this.marketplaceId],
      PurgeAndReplace: purgeReplace
    }, feedBody);
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        if (typeof cb === 'function') {
          return cb(res);
        }
      };
    })(this));
  };

  return FeedsClient;

})(mws.Client);

XMLFeeds = (function() {
  function XMLFeeds(options) {
    var ref;
    if (options == null) {
      options = {};
    }
    this.builder = require('xmlbuilder');
    this.merchantId = (ref = options.merchantId) != null ? ref : null;
    if (typeof options.locale === 'object') {
      this.currency = options.locale.currency;
      this.encoding = options.locale.charset;
    } else {
      this.currency = MWS_LOCALES[options.locale].currency;
      this.encoding = MWS_LOCALES[options.locale].charset;
    }
  }

  XMLFeeds.prototype.orderFulfillment = function(orders) {
    var a, cnt, f, fd, head, i, it, items, j, l, len, len1, len2, len3, len4, m, n, o, p, q, ref, ref1, ref2, xml;
    xml = this.builder.create('AmazonEnvelope', {
      encoding: this.encoding
    });
    xml.att('xmlns:xsi', "http://www.w3.org/2001/XMLSchema-instance");
    xml.att('xsi:noNamespaceSchemaLocation', "amzn-envelope.xsd");
    head = xml.e('Header');
    head.e('DocumentVersion', '1.01');
    head.e('MerchantIdentifier', this.merchantID);
    xml.e('MessageType', 'OrderFulfillment');
    cnt = 1;
    for (j = 0, len = orders.length; j < len; j++) {
      o = orders[j];
      m = xml.e('Message');
      m.e('MessageID', '' + cnt++);
      f = m.e('OrderFulfillment');
      ref = ['AmazonOrderID', 'MerchantOrderID', 'MerchantFulfillmentID'];
      for (l = 0, len1 = ref.length; l < len1; l++) {
        a = ref[l];
        if (o[a]) {
          f.e(a, o[a]);
        }
      }
      if (o.FulfillmentDate) {
        f.e('FulfillmentDate', o.FulfillmentDate);
      } else {
        f.e('FulfillmentDate', new Date().toISOString());
      }
      if (o.FulfillmentData) {
        fd = f.e('FulfillmentData', o.FulfillmentData);
        ref1 = ['CarrierCode', 'CarrierName', 'ShippingMethod', 'ShipperTrackingNumber'];
        for (n = 0, len2 = ref1.length; n < len2; n++) {
          a = ref1[n];
          if (o.FulfillmentData[a]) {
            fd.e(a, o.FulfillmentData[a]);
          }
        }
      }
      items = Array.isArray(o.Item) ? o.Item : [o.Item];
      for (p = 0, len3 = items.length; p < len3; p++) {
        i = items[p];
        it = f.e('Item');
        ref2 = ['AmazonOrderItemCode', 'MerchantOrderItemID', 'MerchantFulfillmentItemID', 'Quantity'];
        for (q = 0, len4 = ref2.length; q < len4; q++) {
          a = ref2[q];
          if (i[a]) {
            it.e(a, i[a]);
          }
        }
      }
    }
    return iconv.encode(xml.end({
      pretty: true
    }), this.encoding);
  };

  XMLFeeds.prototype.productPricing = function(items) {
    var a, cnt, f, head, item, j, l, len, len1, m, ref, ref1, xml;
    if (!Array.isArray(items)) {
      items = [items];
    }
    xml = this.builder.create('AmazonEnvelope', {
      encoding: this.encoding
    });
    xml.att('xmlns:xsi', "http://www.w3.org/2001/XMLSchema-instance");
    xml.att('xsi:noNamespaceSchemaLocation', "amzn-envelope.xsd");
    head = xml.e('Header');
    head.e('DocumentVersion', '1.01');
    head.e('MerchantIdentifier', this.merchantId);
    xml.e('MessageType', 'Price');
    cnt = 1;
    for (j = 0, len = items.length; j < len; j++) {
      item = items[j];
      m = xml.e('Message');
      m.e('MessageID', '' + cnt++);
      f = m.e('Price');
      if (item['SKU']) {
        f.e('SKU', item['SKU']);
      }
      ref = ['StandardPrice', 'MAP'];
      for (l = 0, len1 = ref.length; l < len1; l++) {
        a = ref[l];
        if (item[a]) {
          f.e(a, {
            currency: (ref1 = item['Currency']) != null ? ref1 : this.currency
          }, item[a]);
        }
      }
    }
    return iconv.encode(xml.end({
      pretty: true
    }), this.encoding);
  };

  return XMLFeeds;

})();

module.exports = {
  service: MWS_FEEDS,
  enums: enums,
  types: types,
  requests: requests,
  Client: FeedsClient,
  XMLFeeds: XMLFeeds
};
