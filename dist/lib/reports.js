var MWS_REPORTS, ReportsClient, enums, mws, reportTypes, requests,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

mws = require("./core");

MWS_REPORTS = new mws.Service({
  name: "Reports",
  group: "Reports & Report Scheduling",
  path: "/",
  version: "2009-01-01",
  legacy: true
});

reportTypes = {
  '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_': {
    title: 'Inventory Report',
    group: 'Listing',
    format: 'flat',
    request: true
  },
  '_GET_MERCHANT_LISTINGS_DATA_': {
    title: 'Active Listings Report',
    group: 'Listing',
    format: 'flat',
    request: true
  },
  '_GET_MERCHANT_LISTINGS_DATA_BACK_COMPAT_': {
    title: 'Open Listings Report',
    group: 'Listing',
    format: 'flat',
    request: true
  },
  '_GET_MERCHANT_LISTINGS_DATA_LITE_': {
    title: 'Open Listings Report Lite',
    group: 'Listing',
    format: 'flat',
    request: true
  },
  '_GET_MERCHANT_LISTINGS_DATA_LITER_': {
    title: 'Open Listings Report Liter',
    group: 'Listing',
    format: 'flat',
    request: true
  },
  '_GET_MERCHANT_CANCELLED_LISTINGS_DATA_': {
    title: 'Canceled Listings Report',
    group: 'Listing',
    format: 'flat',
    request: true
  },
  '_GET_CONVERGED_FLAT_FILE_SOLD_LISTINGS_DATA': {
    title: 'Sold Listings Report',
    group: 'Listing',
    format: 'flat',
    request: true
  },
  '_GET_MERCHANT_LISTINGS_DEFECT_DATA_': {
    title: 'Listing Quality and Suppressed Listing Report',
    group: 'Listing',
    format: 'flat',
    request: true
  },
  '_GET_FLAT_FILE_ACTIONABLE_ORDER_DATA_': {
    title: 'Unshipped Orders Report',
    group: 'Order',
    format: 'flat',
    request: true,
    schedule: true
  },
  '_GET_ORDERS_DATA_': {
    title: 'Scheduled XML Order Report',
    group: 'Order',
    format: 'xml',
    schedule: true
  },
  '_GET_FLAT_FILE_ORDERS_DATA_': {
    title: 'Requested or Scheduled Flat File Order Report',
    group: 'Order',
    format: 'flat',
    schedule: true,
    request: true
  },
  '_GET_CONVERGED_FLAT_FILE_ORDER_REPORT_DATA_': {
    title: 'Flat File Order Report',
    group: 'Order',
    format: 'flat',
    schedule: true,
    request: true
  },
  '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_': {
    title: 'Flat File Orders By Last Update Report',
    group: 'Order Tracking',
    format: 'flat',
    request: true
  },
  '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_': {
    title: 'Flat File Orders By Order Date Report',
    group: 'Order Tracking',
    format: 'flat',
    request: true
  },
  '_GET_XML_ALL_ORDERS_DATA_BY_LAST_UPDATE_': {
    title: 'XML Orders By Last Update Report',
    group: 'Order Tracking',
    format: 'xml',
    request: true
  },
  '_GET_XML_ALL_ORDERS_DATA_BY_ORDER_DATE_': {
    title: 'XML Orders By Order Date Report',
    group: 'Order Tracking',
    format: 'xml',
    request: true
  },
  '_GET_FLAT_FILE_PENDING_ORDERS_DATA_': {
    title: 'Flat File Pending Orders Report',
    group: 'Pending Order',
    format: 'flat',
    schedule: true,
    request: true
  },
  '_GET_PENDING_ORDERS_DATA_': {
    title: 'XML Pending Orders Report',
    group: 'Pending Order',
    format: 'xml',
    schedule: true,
    request: true
  },
  '_GET_CONVERGED_FLAT_FILE_PENDING_ORDERS_DATA_': {
    title: 'Converged Flat File Pending Orders Report',
    group: 'Pending Order',
    format: 'flat',
    schedule: true,
    request: true
  },
  '_GET_SELLER_FEEDBACK_DATA_': {
    title: 'Flat File Feedback Report',
    group: 'Performance',
    format: 'flat',
    request: true
  },
  '_GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_': {
    title: 'Flat File Settlement Report',
    group: 'Settlement',
    format: 'flat',
    request: false
  },
  '_GET_V2_SETTLEMENT_REPORT_DATA_XML_': {
    title: 'XML Settlement Report',
    group: 'Settlement',
    format: 'xml',
    request: false
  },
  '_GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2_': {
    title: 'Flat File V2 Settlement Report',
    group: 'Settlement',
    format: 'xml',
    request: false
  },
  '_GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2_': {
    title: 'Flat File V2 Settlement Report',
    group: 'Settlement',
    format: 'xml',
    request: false
  },
  '_GET_FLAT_FILE_PAYMENT_SETTLEMENT_DATA_': {
    title: 'Flat File Settlement Report',
    group: 'Settlement',
    format: 'flat',
    request: false
  },
  '_GET_PAYMENT_SETTLEMENT_DATA_': {
    title: 'XML Settlement Report',
    group: 'Settlement',
    format: 'xml',
    request: false
  },
  '_GET_ALT_FLAT_FILE_PAYMENT_SETTLEMENT_DATA_': {
    title: 'Flat File V2 Settlement Report',
    group: 'Settlement',
    format: 'flat',
    request: false
  },
  '_GET_AMAZON_FULFILLED_SHIPMENTS_DATA_': {
    title: 'FBA Amazon Fulfilled Shipments Report',
    group: 'FBA Sales',
    format: 'flat',
    request: true
  },
  '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_': {
    title: 'Flat File All Orders Report by Last Update',
    group: 'FBA Sales',
    format: 'flat',
    request: true
  },
  '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_': {
    title: 'Flat File All Orders Report by Order Date',
    group: 'FBA Sales',
    format: 'flat',
    request: true
  },
  '_GET_XML_ALL_ORDERS_DATA_BY_LAST_UPDATE_': {
    title: 'XML All Orders Report by Last Update',
    group: 'FBA Sales',
    format: 'xml',
    request: true
  },
  '_GET_XML_ALL_ORDERS_DATA_BY_ORDER_DATE_': {
    title: 'XML All Orders Report by Order Date',
    group: 'FBA Sales',
    format: 'xml',
    request: true
  },
  '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_SALES_DATA_': {
    title: 'FBA Customer Shipment Sales Report',
    group: 'FBA Sales',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_PROMOTION_DATA_': {
    title: 'FBA Promotions Report',
    group: 'FBA Sales',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_CUSTOMER_TAXES_DATA_': {
    title: 'FBA Customer Taxes',
    group: 'FBA Sales',
    format: 'flat',
    request: true
  },
  '_GET_AFN_INVENTORY_DATA_': {
    title: 'FBA Amazon Fulfilled Inventory Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_AFN_INVENTORY_DATA_BY_COUNTRY_': {
    title: 'FBA Multi-Country Inventory Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_CURRENT_INVENTORY_DATA_': {
    title: 'FBA Daily Inventory History Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_MONTHLY_INVENTORY_DATA_': {
    title: 'FBA Monthly Inventory History Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_INVENTORY_RECEIPTS_DATA_': {
    title: 'FBA Received Inventory Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_INVENTORY_SUMMARY_DATA_': {
    title: 'FBA Inventory Event Detail Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_INVENTORY_ADJUSTMENTS_DATA_': {
    title: 'FBA Inventory Adjustments Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_INVENTORY_HEALTH_DATA_': {
    title: 'FBA Inventory Health Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_MYI_UNSUPPRESSED_INVENTORY_DATA_': {
    title: 'FBA Manage Inventory',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_MYI_ALL_INVENTORY_DATA_': {
    title: 'FBA Manage Inventory - Archived',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_CROSS_BORDER_INVENTORY_MOVEMENT_DATA_': {
    title: 'FBA Cross-Border Inventory Movement Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_INBOUND_NONCOMPLIANCE_DATA_': {
    title: 'FBA Inbound Performance Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_HAZMAT_STATUS_CHANGE_DATA_': {
    title: 'FBA Hazmat Status Change Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_ESTIMATED_FBA_FEES_TXT_DATA_': {
    title: 'FBA Fee Preview Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_REIMBURSEMENTS_DATA_': {
    title: 'FBA Reimbursements Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_CUSTOMER_RETURNS_DATA_': {
    title: 'FBA Returns Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_REPLACEMENT_DATA_': {
    title: 'FBA Replacements Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_RECOMMENDED_REMOVAL_DATA_': {
    title: 'FBA Recommended Removal Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_REMOVAL_ORDER_DETAIL_DATA_': {
    title: 'FBA Removal Order Detail Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  },
  '_GET_FBA_FULFILLMENT_REMOVAL_SHIPMENT_DETAIL_DATA_': {
    title: 'FBA Removal Shipment Detail Report',
    group: 'FBA Inventory',
    format: 'flat',
    request: true
  }
};


/*
Ojects to represent enum collections used by some request(s)
@type {Object}
 */

enums = {
  Schedule: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      _Class.__super__.constructor.call(this, "Schedule", ["_15_MINUTES_", "_30_MINUTES_", "_1_HOUR_", "_2_HOURS_", "_4_HOURS_", "_8_HOURS_", "_12_HOURS_", "_72_HOURS_", "_1_DAY_", "_2_DAYS_", "_7_DAYS_", "_14_DAYS_", "_15_DAYS_", "_30_DAYS_", "_NEVER_"], true);
    }

    return _Class;

  })(mws.Enum),
  ReportProcessingStatusList: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      _Class.__super__.constructor.call(this, "ReportProcessingStatusList", "Status", ["_SUBMITTED_", "_IN_PROGRESS_", "_CANCELLED_", "_DONE_", "_DONE_NO_DATA_"], false);
    }

    return _Class;

  })(mws.EnumList),
  ReportOptions: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      _Class.__super__.constructor.call(this, "ReportOptions", ["ShowSalesChannel=true", "ShowSalesChannel=false"], false);
    }

    return _Class;

  })(mws.Enum),
  RequestableReportType: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      var k, reqReportsTypes, v;
      reqReportsTypes = (function() {
        var results;
        results = [];
        for (k in reportTypes) {
          v = reportTypes[k];
          if (v.request) {
            results.push(k);
          }
        }
        return results;
      })();
      _Class.__super__.constructor.call(this, "ReportType", reqReportsTypes, true);
    }

    return _Class;

  })(mws.Enum),
  SchedulableReportType: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      var k, schedReportsTypes, v;
      schedReportsTypes = (function() {
        var results;
        results = [];
        for (k in reportTypes) {
          v = reportTypes[k];
          if (v.schedule) {
            results.push(k);
          }
        }
        return results;
      })();
      _Class.__super__.constructor.call(this, "ReportType", schedReportsTypes, true);
    }

    return _Class;

  })(mws.Enum),
  ReportTypeList: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      var k, reportTypesList, v;
      reportTypesList = (function() {
        var results;
        results = [];
        for (k in reportTypes) {
          v = reportTypes[k];
          results.push(k);
        }
        return results;
      })();
      _Class.__super__.constructor.call(this, "ReportTypeList", "Type", reportTypesList, false);
    }

    return _Class;

  })(mws.EnumList)
};


/*
A collection of currently supported request constructors. Once created and
configured, the returned requests can be passed to an mws client `invoke` call
@type {Object}
 */

requests = {
  RequestReport: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'RequestReport', [new enums.RequestableReportType(), new mws.Timestamp('StartDate'), new mws.Timestamp('EndDate'), new enums.ReportOptions(), new mws.ParamList('MarketplaceIdList', 'Id')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportRequestList: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportRequestList', [new mws.ParamList('ReportRequestIdList', 'Id'), new enums.ReportTypeList(), new enums.ReportProcessingStatusList(), new mws.Param('MaxCount'), new mws.Timestamp('RequestedFromDate'), new mws.Timestamp('RequestedToDate')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportRequestListByNextToken: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportRequestListByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportRequestCount: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportRequestCount', [new enums.ReportTypeList(), new enums.ReportProcessingStatusList(), new mws.Timestamp('RequestedFromDate'), new mws.Timestamp('RequestedToDate')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  CancelReportRequests: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'CancelReportRequests', [new mws.ParamList('ReportRequestIdList', 'Id'), new enums.ReportTypeList(), new enums.ReportProcessingStatusList(), new mws.Timestamp('RequestedFromDate'), new mws.Timestamp('RequestedToDate')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportList: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportList', [new mws.Param('MaxCount'), new enums.ReportTypeList(), new mws.Bool('Acknowledged'), new mws.Timestamp('AvailableFromDate'), new mws.Timestamp('AvailableToDate'), new mws.ParamList('ReportRequestIdList', 'Id')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportListByNextToken: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportListByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportCount: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportCount', [new enums.ReportTypeList(), new mws.Bool('Acknowledged'), new mws.Timestamp('AvailableFromDate'), new mws.Timestamp('AvailableToDate')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReport: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReport', [new mws.Param('ReportId', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  ManageReportSchedule: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'ManageReportSchedule', [new enums.SchedulableReportType(), new enums.Schedule(), new mws.Timestamp('ScheduledDate')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportScheduleList: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportScheduleList', [new enums.ReportTypeList()], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportScheduleListByNextToken: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportScheduleListByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetReportScheduleCount: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportScheduleCount', [new enums.ReportTypeList()], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  UpdateReportAcknowledgements: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_REPORTS, 'UpdateReportAcknowledgements', [new mws.ParamList('ReportIdList', 'Id', true), new mws.Bool('Acknowledged')], {}, null, init);
    }

    return _Class;

  })(mws.Request)
};

ReportsClient = (function(superClass) {
  extend(ReportsClient, superClass);

  function ReportsClient() {
    return ReportsClient.__super__.constructor.apply(this, arguments);
  }

  ReportsClient.prototype.requestReport = function(options, cb) {
    var req;
    req = new requests.RequestReport(options);
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        var ref, ref1, reportReqInfo;
        reportReqInfo = (ref = (ref1 = res.result) != null ? ref1.ReportRequestInfo : void 0) != null ? ref : null;
        return cb(reportReqInfo, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportRequestList = function(options, cb) {
    var req;
    req = new requests.GetReportRequestList(options);
    return this.invoke(req, {
      nextTokenCall: requests.GetReportRequestListByNextToken,
      nextTokenCallUseHasNext: true
    }, (function(_this) {
      return function(res) {
        var ref, ref1, reportReqInfoList;
        reportReqInfoList = (ref = (ref1 = res.result) != null ? ref1.ReportRequestInfo : void 0) != null ? ref : null;
        return cb(reportReqInfoList, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportRequestListByNextToken = function(token, cb) {
    var req;
    req = new requests.GetReportRequestListByNextToken({
      NextToken: token
    });
    return this.invoke(req, {
      nextTokenCall: requests.GetReportRequestListByNextToken,
      nextTokenCallUseHasNext: true
    }, (function(_this) {
      return function(res) {
        var ref, ref1, reportReqInfoList;
        reportReqInfoList = (ref = (ref1 = res.result) != null ? ref1.ReportRequestInfo : void 0) != null ? ref : null;
        return cb(reportReqInfoList, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportRequestCount = function(options, cb) {
    var req;
    req = new requests.GetReportRequestCount(options);
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        var count, ref, ref1;
        count = (ref = (ref1 = res.result) != null ? ref1.Count : void 0) != null ? ref : null;
        return cb(count, res);
      };
    })(this));
  };

  ReportsClient.prototype.cancelReportRequests = function(options, cb) {
    var req;
    req = new requests.CancelReportRequests(options);
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        var canceledReportReqInfoList, ref, ref1;
        canceledReportReqInfoList = (ref = (ref1 = res.result) != null ? ref1.ReportRequestInfo : void 0) != null ? ref : null;
        return cb(canceledReportReqInfoList, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportList = function(options, cb) {
    var req;
    req = new requests.GetReportList(options);
    return this.invoke(req, {
      nextTokenCall: requests.GetReportListByNextToken,
      nextTokenCallUseHasNext: true
    }, (function(_this) {
      return function(res) {
        var ref, ref1, reportInfo;
        reportInfo = (ref = (ref1 = res.result) != null ? ref1.ReportInfo : void 0) != null ? ref : null;
        return cb(reportInfo, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportListByNextToken = function(token, cb) {
    var req;
    req = new requests.GetReportListByNextToken({
      NextToken: token
    });
    return this.invoke(req, {
      nextTokenCall: requests.GetReportListByNextToken,
      nextTokenCallUseHasNext: true
    }, (function(_this) {
      return function(res) {
        var ref, ref1, reportInfo;
        reportInfo = (ref = (ref1 = res.result) != null ? ref1.ReportInfo : void 0) != null ? ref : null;
        return cb(reportInfo, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportCount = function(options, cb) {
    var req;
    req = new requests.GetReportCount(options);
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        var count, ref, ref1;
        count = (ref = (ref1 = res.result) != null ? ref1.Count : void 0) != null ? ref : null;
        return cb(count, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReport = function(options, cb) {
    var req;
    req = new requests.GetReport(options);
    return this.invoke(req, {
      allowedContentTypes: ['application/octet-stream', 'text', 'text/plain']
    }, (function(_this) {
      return function(res) {
        var report;
        report = res.response;
        return cb(report, res);
      };
    })(this));
  };

  ReportsClient.prototype.manageReportSchedule = function(options, cb) {
    var req;
    req = new requests.ManageReportSchedule(options);
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        var ref, ref1, reportSchedules;
        reportSchedules = (ref = (ref1 = res.result) != null ? ref1.ReportSchedule : void 0) != null ? ref : null;
        return cb(reportSchedules, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportScheduleList = function(options, cb) {
    var req;
    req = new requests.GetReportScheduleList(options);
    return this.invoke(req, {
      nextTokenCall: requests.GetReportScheduleListByNextToken
    }, (function(_this) {
      return function(res) {
        var ref, ref1, reportSchedule;
        reportSchedule = (ref = (ref1 = res.result) != null ? ref1.ReportSchedule : void 0) != null ? ref : null;
        return cb(reportSchedule, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportScheduleListByNextToken = function(token, cb) {
    var req;
    req = new requests.GetReportScheduleListByNextToken({
      NextToken: token
    });
    return this.invoke(req, {
      nextTokenCall: requests.GetReportScheduleListByNextToken
    }, (function(_this) {
      return function(res) {
        var ref, ref1, reportSchedule;
        reportSchedule = (ref = (ref1 = res.result) != null ? ref1.ReportSchedule : void 0) != null ? ref : null;
        return cb(reportSchedule, res);
      };
    })(this));
  };

  ReportsClient.prototype.getReportScheduleCount = function(options, cb) {
    var req;
    req = new requests.GetReportScheduleCount(options);
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        var count, ref, ref1;
        count = (ref = (ref1 = res.result) != null ? ref1.Count : void 0) != null ? ref : null;
        return cb(count, res);
      };
    })(this));
  };

  ReportsClient.prototype.updateReportAcknowledgements = function(options, cb) {
    var req;
    req = new requests.UpdateReportAcknowledgements(options);
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        var ref, ref1, reportInfo;
        reportInfo = (ref = (ref1 = res.result) != null ? ref1.ReportInfo : void 0) != null ? ref : null;
        return cb(reportInfo, res);
      };
    })(this));
  };

  return ReportsClient;

})(mws.Client);

module.exports = {
  service: MWS_REPORTS,
  enums: enums,
  requests: requests,
  Client: ReportsClient
};
