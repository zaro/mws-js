var MWS_ORDERS, OrdersClient, enums, mws, requests, types,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

mws = require('./core');

MWS_ORDERS = new mws.Service({
  name: "Orders",
  group: "Order Retrieval",
  path: "/Orders/2011-01-01",
  version: "2011-01-01",
  legacy: false
});

enums = {
  OrderStatus: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      _Class.__super__.constructor.call(this, 'OrderStatus', 'Status', ["Pending", "Unshipped", "PartiallyShipped", "Shipped", "Canceled", "Unfulfillable"]);
    }

    _Class.prototype.render = function(obj) {
      if (obj == null) {
        obj = {};
      }
      if (this.value.Unshipped !== this.value.PartiallyShipped) {
        throw "Unshipped & PartiallyShipped must both be enabled on the OrderStatus Param";
      }
      return _Class.__super__.render.call(this, obj);
    };

    return _Class;

  })(mws.EnumList),
  FulfillmentChannel: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      _Class.__super__.constructor.call(this, 'FulfillmentChannel', 'Channel', ['AFN', 'MFN']);
    }

    return _Class;

  })(mws.EnumList),
  PaymentMethod: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      _Class.__super__.constructor.call(this, 'PaymentMethod', 'Method', ['COD', 'CVS', 'Other']);
    }

    return _Class;

  })(mws.EnumList)
};

types = {
  ServiceStatus: mws.types.ServiceStatus,
  FulfillmentChannel: {
    AFN: "Amazon Fulfillment Network",
    MFN: "Merchant's Fulfillment Network"
  },
  OrderStatus: {
    Pending: "Order placed but payment not yet authorized. Not ready for shipment.",
    Unshipped: "Payment has been authorized. Order ready for shipment, but no items shipped yet. Implies PartiallyShipped.",
    PartiallyShipped: "One or more (but not all) items have been shipped. Implies Unshipped.",
    Shipped: "All items in the order have been shipped.",
    Canceled: "The order was canceled.",
    Unfulfillable: "The order cannot be fulfilled. Applies only to Amazon-fulfilled orders not placed on Amazon."
  },
  PaymentMethod: {
    COD: "Cash on delivery",
    CVS: "Convenience store payment",
    Other: "Any payment method other than COD or CVS"
  },
  ShipServiceLevelCategory: {
    Expedited: "Expedited shipping",
    NextDay: "Overnight shipping",
    SecondDay: "Second-day shipping",
    Standard: "Standard shipping"
  }
};

requests = {
  GetServiceStatus: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_ORDERS, 'GetServiceStatus', [], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  ListOrders: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_ORDERS, 'ListOrders', [new mws.Timestamp('CreatedAfter'), new mws.Timestamp('CreatedBefore'), new mws.Timestamp('LastUpdatedAfter'), new mws.Timestamp('LastUpdatedBefore'), new mws.ParamList('MarketplaceId', 'Id', true), new enums.OrderStatus(), new enums.FulfillmentChannel(), new enums.PaymentMethod(), new mws.Param('BuyerEmail'), new mws.Param('SellerOrderId'), new mws.Param('MaxResultsPerPage')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  ListOrdersByNextToken: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_ORDERS, 'ListOrdersByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetOrder: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_ORDERS, 'GetOrder', [new mws.ParamList('AmazonOrderId', 'Id', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  ListOrderItems: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_ORDERS, 'ListOrderItems', [new mws.Param('AmazonOrderId', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  ListOrderItemsByNextToken: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_ORDERS, 'ListOrderItemsByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request)
};

OrdersClient = (function(superClass) {
  extend(OrdersClient, superClass);

  function OrdersClient() {
    return OrdersClient.__super__.constructor.apply(this, arguments);
  }

  OrdersClient.prototype.getServiceStatus = function(cb) {
    return this.invoke(new requests.GetServiceStatus(), {}, (function(_this) {
      return function(res) {
        var ref, ref1, status;
        status = (ref = (ref1 = res.result) != null ? ref1.Status : void 0) != null ? ref : null;
        return cb(status, res);
      };
    })(this));
  };

  OrdersClient.prototype.listOrders = function(options, cb) {
    var ref, req;
    if ((options.CreatedAfter != null) || (options.LastUpdatedAfter != null)) {
      if (options.MarketplaceId == null) {
        options.MarketplaceId = (ref = this.marketplaceIds) != null ? ref : this.marketplaceId;
      }
      req = new requests.ListOrders(options);
      return this.invoke(req, {
        nextTokenCall: requests.ListOrdersByNextToken
      }, (function(_this) {
        return function(res) {
          var orders, ref1, ref2, ref3;
          orders = (ref1 = (ref2 = res.result) != null ? (ref3 = ref2.Orders) != null ? ref3.Order : void 0 : void 0) != null ? ref1 : null;
          return cb(orders, res);
        };
      })(this));
    } else {
      throw 'Special Case: requires AT LEAST ONE OF either CreatedAfter or LastUpdatedAfter timestamps be used!';
    }
  };

  OrdersClient.prototype.listOrdersByNextToken = function(token, cb) {
    var req;
    req = new requests.ListOrdersByNextToken({
      NextToken: token
    });
    return this.invoke(req, {
      nextTokenCall: requests.ListOrdersByNextToken
    }, (function(_this) {
      return function(res) {
        var orders, ref, ref1, ref2;
        orders = (ref = (ref1 = res.result) != null ? (ref2 = ref1.Orders) != null ? ref2.Order : void 0 : void 0) != null ? ref : null;
        return cb(orders, res);
      };
    })(this));
  };

  OrdersClient.prototype.getOrder = function(orderId, cb) {
    var req;
    req = new requests.GetOrder({
      AmazonOrderId: orderId
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        var orders, ref, ref1, ref2;
        orders = (ref = (ref1 = res.result) != null ? (ref2 = ref1.Orders) != null ? ref2.Order : void 0 : void 0) != null ? ref : null;
        return cb(orders, res);
      };
    })(this));
  };

  OrdersClient.prototype.listOrderItems = function(orderId, cb) {
    var req;
    req = new requests.ListOrderItems({
      AmazonOrderId: orderId
    });
    return this.invoke(req, {
      nextTokenCall: requests.ListOrderItemsByNextToken
    }, (function(_this) {
      return function(res) {
        var items, ref, ref1, ref2;
        items = (ref = (ref1 = res.result) != null ? (ref2 = ref1.OrderItems) != null ? ref2.OrderItem : void 0 : void 0) != null ? ref : null;
        return cb(items, res);
      };
    })(this));
  };

  OrdersClient.prototype.listOrderItemsByNextToken = function(token, cb) {
    var req;
    req = new requests.ListOrderItemsByNextToken({
      NextToken: token
    });
    return this.invoke(req, {
      nextTokenCall: requests.ListOrderItemsByNextToken
    }, (function(_this) {
      return function(res) {
        var items, ref, ref1, ref2;
        items = (ref = (ref1 = res.result) != null ? (ref2 = ref1.OrderItems) != null ? ref2.OrderItem : void 0 : void 0) != null ? ref : null;
        return cb(items, res);
      };
    })(this));
  };

  return OrdersClient;

})(mws.Client);

module.exports = {
  service: MWS_ORDERS,
  enums: enums,
  requests: requests,
  Client: OrdersClient
};
