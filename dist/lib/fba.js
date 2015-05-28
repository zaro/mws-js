var Address_Base, FBAInboundClient, FBAInventoryClient, FBAOutboundClient, MWS_FBA_INBOUND, MWS_FBA_INVENTORY, MWS_FBA_OUTBOUND, complex, enums, mws, requests, types,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

mws = require('./core');

MWS_FBA_INBOUND = new mws.Service({
  name: 'Fulfillment',
  group: 'Inbound Shipments',
  path: '/FulfillmentInboundShipment/2010-10-01',
  version: '2010-10-01',
  legacy: false
});

MWS_FBA_OUTBOUND = new mws.Service({
  name: 'Fulfillment',
  group: 'Outbound Shipments',
  path: '/FulfillmentOutboundShipment/2010-10-01',
  version: '2010-10-01',
  legacy: false
});

MWS_FBA_INVENTORY = new mws.Service({
  name: 'Fulfillment',
  group: 'Inventory',
  path: '/FulfillmentInventory/2010-10-01',
  version: '2010-10-01',
  legacy: false
});

complex = {
  DisplayableOrder: (function(superClass) {
    extend(_Class, superClass);

    function _Class(name, required1, init) {
      this.name = name != null ? name : 'DisplayableOrder';
      this.required = required1 != null ? required1 : false;
      this.params = {
        id: new mws.Param('DisplayableOrderId', true),
        dateTime: new mws.Timestamp('DisplayableOrderDateTime', false),
        comment: new mws.Param('DisplayableOrderComment', false)
      };
      if (init != null) {
        this.set(init);
      }
    }

    return _Class;

  })(mws.ComplexParam),
  Address: Address_Base = (function(superClass) {
    extend(Address_Base, superClass);

    function Address_Base(name, required1, init) {
      this.name = name != null ? name : 'Address';
      this.required = required1 != null ? required1 : false;
      this.params = {
        name: new mws.Param('Name', true),
        line1: new mws.Param('Line1', true),
        line2: new mws.Param('Line2', false),
        line3: new mws.Param('Line3', false),
        city: new mws.Param('City', true),
        county: new mws.Param('DistrictOrCounty', false),
        state: new mws.Param('StateOrProvinceCode', true),
        zip: new mws.Param('PostalCode', true),
        country: new mws.Param('CountryCode', true),
        phone: new mws.Param('PhoneNumber', false)
      };
      if (init != null) {
        this.set(init);
      }
    }

    return Address_Base;

  })(mws.ComplexParam),
  DestinationAddress: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required, init) {
      _Class.__super__.constructor.call(this, 'DestinationAddress', required, init);
    }

    return _Class;

  })(Address_Base),
  ShipFromAddress: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required1, init) {
      this.required = required1 != null ? required1 : false;
      this.name = 'ShipFromAddress';
      this.params = {
        name: new mws.Param('Name', true),
        line1: new mws.Param('AddressLine1', true),
        line2: new mws.Param('AddressLine2', false),
        city: new mws.Param('City', true),
        county: new mws.Param('DistrictOrCounty', false),
        state: new mws.Param('StateOrProvinceCode', true),
        zip: new mws.Param('PostalCode', true),
        country: new mws.Param('CountryCode', true)
      };
      if (init != null) {
        this.set(init);
      }
    }

    return _Class;

  })(mws.ComplexParam),
  InboundShipmentHeader: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required1, init) {
      this.required = required1 != null ? required1 : false;
      this.name = 'InboundShipmentHeader';
      this.params = {
        shipmentName: new mws.Param('ShipmentName', true),
        shipFromAddress: new complex.ShipFromAddress(true),
        destFCID: new mws.Param('DestinationFulfillmentCenterId', true),
        shipmentStatus: new mws.Param('ShipmentStatus', false),
        labelPrepPref: new mws.Param('LabelPrepPreference', false)
      };
    }

    return _Class;

  })(mws.ComplexParam),
  LineItem: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required1, init) {
      this.required = required1 != null ? required1 : false;
      this.params = {
        comment: new mws.Param('DisplayableComment'),
        giftMessage: new mws.Param('GiftMessage'),
        declaredValue: new mws.Param('PerUnitDeclaredValue.Value'),
        declaredCurrency: new mws.Param('PerUnitDeclaredValue.CurrencyCode'),
        quantity: new mws.Param('Quantity'),
        itemId: new mws.Param('SellerFulfillmentOrderItemId'),
        sku: new mws.Param('SellerSKU')
      };
      if (init != null) {
        this.set(init);
      }
    }

    return _Class;

  })(mws.ComplexParam),
  LineItems: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, 'Items', 'member');
    }

    _Class.prototype.addItem = function(itemId, sku, quantity, declaredValue, declaredCurrency, giftMessage, comment) {
      if (arguments.length === 1 && typeof itemId === 'object') {
        if (itemId.render != null) {
          return this.value.push(itemId);
        } else {
          return this.value.push(new complex.LineItem(itemId));
        }
      } else {
        return this.value.push(new complex.LineItem({
          itemId: itemId,
          sku: sku,
          quantity: quantity,
          declaredValue: declaredValue,
          declaredCurrency: declaredCurrency,
          giftMessage: giftMessage,
          comment: comment
        }));
      }
    };

    return _Class;

  })(mws.ComplexList),
  InboundShipmentItem: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      this.params = {
        quantity: new mws.Param('QuantityShipped'),
        sku: new mws.Param('SellerSKU')
      };
      if (init != null) {
        this.set(init);
      }
    }

    return _Class;

  })(mws.ComplexParam),
  InboundShipmentItems: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required, init) {
      _Class.__super__.constructor.call(this, 'InboundShipmentItems', 'member', required, init);
    }

    _Class.prototype.addItem = function(quantity, sku) {
      if (arguments.length === 1 && typeof quantity === 'object') {
        if (quantity.render != null) {
          this.value.push(itemId);
        } else {
          this.value.push(new complex.InboundShipmentItem(quantity));
        }
      }
      return this.value.push(new complex.InboundShipmentItem({
        quantity: quantity,
        sku: sku
      }));
    };

    return _Class;

  })(mws.ComplexList),
  InboundShipmentPlanRequestItem: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      this.params = {
        quantity: new mws.Param('Quantity'),
        sku: new mws.Param('SellerSKU'),
        asin: new mws.Param('ASIN'),
        condition: new mws.Param('Condition')
      };
      if (init != null) {
        this.set(init);
      }
    }

    return _Class;

  })(mws.ComplexParam),
  InboundShipmentPlanRequestItems: (function(superClass) {
    extend(_Class, superClass);

    function _Class(required, init) {
      _Class.__super__.constructor.call(this, 'InboundShipmentPlanRequestItems', 'member', required, init);
    }

    _Class.prototype.addItem = function(quantity, sku, asin, condition) {
      if (arguments.length === 1 && typeof quantity === 'object') {
        if (quantity.render != null) {
          this.value.push(itemId);
        } else {
          this.value.push(new complex.InboundShipmentPlanRequestItem(quantity));
        }
      }
      return this.value.push(new complex.InboundShipmentPlanRequestItem({
        quantity: quantity,
        sku: sku,
        asin: asin,
        condition: condition
      }));
    };

    return _Class;

  })(mws.ComplexList)
};

enums = {
  ResponseGroup: (function(superClass) {
    extend(_Class, superClass);

    function _Class(options) {
      var ref;
      if (options == null) {
        options = {};
      }
      _Class.__super__.constructor.call(this, 'ResponseGroup', ['Basic', 'Detailed'], (ref = options.required) != null ? ref : false);
    }

    return _Class;

  })(mws.Enum),
  ShippingSpeedCategory: (function(superClass) {
    extend(_Class, superClass);

    function _Class(options) {
      var ref;
      if (options == null) {
        options = {};
      }
      _Class.__super__.constructor.call(this, 'ShippingSpeedCategory', ['Standard', 'Expedited', 'Priority'], (ref = options.required) != null ? ref : false);
    }

    return _Class;

  })(mws.Enum),
  ShippingSpeedCategories: (function(superClass) {
    extend(_Class, superClass);

    function _Class(options) {
      var ref;
      if (options == null) {
        options = {};
      }
      _Class.__super__.constructor.call(this, 'ShippingSpeedCategories', 'member', ['Standard', 'Expedited', 'Priority'], (ref = options.required) != null ? ref : false);
    }

    return _Class;

  })(mws.EnumList),
  FulfillmentPolicy: (function(superClass) {
    extend(_Class, superClass);

    function _Class(options) {
      var ref;
      if (options == null) {
        options = {};
      }
      _Class.__super__.constructor.call(this, 'FulfillmentPolicy', ['FillOrKill', 'FillAll', 'FillAllAvailable'], (ref = options.required) != null ? ref : false);
    }

    return _Class;

  })(mws.Enum)
};

types = {
  ServiceStatus: mws.types.ServiceStatus
};

requests = {
  inbound: {
    GetServiceStatus: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INBOUND, 'GetServiceStatus', [], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    CreateInboundShipment: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INBOUND, 'CreateInboundShipment', [new mws.Param('ShipmentId', true), new complex.InboundShipmentHeader(true), new complex.InboundShipmentItems(true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    CreateInboundShipmentPlan: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INBOUND, 'CreateInboundShipmentPlan', [new mws.Param('LabelPrepPreference', true), new mws.Param(new mws.Param), new complex.ShipFromAddress(true), new mws.Param('InboundShipmentPlanRequestItems', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListInboundShipmentItems: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INBOUND, 'ListInboundShipmentItems', [
          new mws.Param('ShipmentId', {
            required: true
          }), new mws.Timestamp('LastUpdatedAfter'), new mws.Timestamp('LastUpdatedBefore')
        ], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListInboundShipmentItemsByNextToken: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INBOUND, 'ListInboundShipmentItemsByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListInboundShipments: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INBOUND, 'ListInboundShipments', [new mws.ParamList('ShipmentStatusList', 'member'), new mws.ParamList('ShipmentIdList', 'member'), new mws.Timestamp('LastUpdatedAfter'), new mws.Timestamp('LastUpdatedBefore')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListInboundShipmentsByNextToken: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INBOUND, 'ListInboundShipmentsByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    UpdateInboundShipment: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INBOUND, 'UpdateInboundShipment', [new mws.Param('ShipmentId', true), new complex.InboundShipmentHeader(true), new complex.InboundShipmentItems(true)], {}, null, init);
      }

      return _Class;

    })(mws.Request)
  },
  outbound: {
    GetServiceStatus: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_OUTBOUND, 'GetServiceStatus', [], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    CancelFulfillmentOrder: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_OUTBOUND, 'CancelFulfillmentOrder', [new mws.Param('SellerFulfillmentOrderId', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    CreateFulfillmentOrder: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_OUTBOUND, 'CreateFulfillmentOrder', [
          new mws.Param('SellerFulfillmentOrderId', true), new enums.ShippingSpeedCategory({
            required: true
          }), new enums.FulfillmentPolicy(), new mws.Param('FulfillmentMethod'), new mws.ParamList('NotificationEmailList', 'member'), new complex.DestinationAddress(), new complex.LineItems()
        ], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetFulfillmentOrder: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_OUTBOUND, 'GetFulfillmentOrder', [new mws.Param('SellerFulfillmentOrderId', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetFulfillmentPreview: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_OUTBOUND, 'GetFulfillmentPreview', [new complex.Address('Address'), new complex.LineItems('LineItems'), new enums.ShippingSpeedCategories()], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListAllFulfillmentOrders: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_OUTBOUND, 'ListAllFulfillmentOrders', [new mws.Timestamp('QueryStartDateTime', true), new mws.ParamList('FulfillmentMethod', 'member')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListAllFulfillmentOrdersByNextToken: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_OUTBOUND, 'ListAllFulfillmentOrdersByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request)
  },
  inventory: {
    GetServiceStatus: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INVENTORY, 'GetServiceStatus', [], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListInventorySupply: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INVENTORY, 'ListInventorySupply', [new mws.ParamList('SellerSkus', 'member'), new mws.Timestamp('QueryStartDateTime'), new enums.ResponseGroup()], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListInventorySupplyByNextToken: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_FBA_INVENTORY, 'ListInventorySupplyByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request)
  }
};

FBAInboundClient = (function(superClass) {
  extend(FBAInboundClient, superClass);

  function FBAInboundClient() {
    return FBAInboundClient.__super__.constructor.apply(this, arguments);
  }

  FBAInboundClient.prototype.getServiceStatus = function(cb) {
    return this.invoke(new requests.inbound.GetServiceStatus(), {}, (function(_this) {
      return function(res) {
        var ref, ref1, status;
        status = (ref = (ref1 = res.result) != null ? ref1.Status : void 0) != null ? ref : null;
        return cb(status, res);
      };
    })(this));
  };

  return FBAInboundClient;

})(mws.Client);

FBAOutboundClient = (function(superClass) {
  extend(FBAOutboundClient, superClass);

  function FBAOutboundClient() {
    return FBAOutboundClient.__super__.constructor.apply(this, arguments);
  }

  FBAOutboundClient.prototype.getServiceStatus = function(cb) {
    return this.invoke(new requests.outbound.GetServiceStatus(), {}, (function(_this) {
      return function(res) {
        var ref, ref1, status;
        status = (ref = (ref1 = res.result) != null ? ref1.Status : void 0) != null ? ref : null;
        return cb(status, res);
      };
    })(this));
  };

  return FBAOutboundClient;

})(mws.Client);

FBAInventoryClient = (function(superClass) {
  extend(FBAInventoryClient, superClass);

  function FBAInventoryClient() {
    return FBAInventoryClient.__super__.constructor.apply(this, arguments);
  }

  FBAInventoryClient.prototype.getServiceStatus = function(cb) {
    return this.invoke(new requests.inventory.GetServiceStatus(), {}, (function(_this) {
      return function(res) {
        var ref, ref1, status;
        status = (ref = (ref1 = res.result) != null ? ref1.Status : void 0) != null ? ref : null;
        return cb(status, res);
      };
    })(this));
  };

  return FBAInventoryClient;

})(mws.Client);

module.exports = {
  inbound: {
    service: MWS_FBA_INBOUND,
    requests: requests.inbound,
    Client: FBAInboundClient
  },
  outbound: {
    service: MWS_FBA_OUTBOUND,
    requests: requests.outbound,
    Client: FBAOutboundClient
  },
  inventory: {
    service: MWS_FBA_INVENTORY,
    requests: requests.inventory,
    Client: FBAInventoryClient
  },
  complex: complex,
  types: types,
  requests: requests
};
