var MWS_PRODUCTS, ProductsClient, enums, mws, requests, types,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

mws = require('./core');

MWS_PRODUCTS = new mws.Service({
  name: "Products",
  group: "Products",
  path: "/Products/2011-10-01",
  version: "2011-10-01",
  legacy: false
});

enums = {
  ItemCondition: (function(superClass) {
    extend(_Class, superClass);

    function _Class() {
      _Class.__super__.constructor.call(this, 'ItemCondition', ['New', 'Used', 'Collectible', 'Refurbished', 'Club']);
    }

    return _Class;

  })(mws.Enum)
};

types = {
  ServiceStatus: mws.types.ServiceStatus,
  MarketplaceId: {
    ATVPDKIKX0DER: 'amazon.com',
    A1F83G8C2ARO7P: 'amazon.co.uk',
    A13V1IB3VIYZZH: 'amazon.fr',
    A1PA6795UKMFR9: 'amazon.de',
    APJ6JRA9NG5V4: 'amazon.it',
    A1RKKUPIHCS9HS: 'amazon.es'
  }
};

requests = {
  GetServiceStatus: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetServiceStatus', [], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  ListMatchingProducts: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'ListMatchingProducts', [new mws.Param('MarketplaceId', 'Id', true), new mws.Param('Query', true), new mws.Param('QueryContextId', false)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetMatchingProduct: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetMatchingProduct', [new mws.Param('MarketplaceId', true), new mws.ParamList('ASINList', 'ASIN')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetMatchingProductForId: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetMatchingProductForId', [new mws.Param('MarketplaceId', true), new mws.Param('IdType', true), new mws.ParamList('IdList', 'Id')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetCompetitivePricingForSKU: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetCompetitivePricingForSKU', [new mws.Param('MarketplaceId', 'Id', true), new mws.ParamList('SellerSKUList', 'SellerSKU', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetCompetitivePricingForASIN: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetCompetitivePricingForASIN', [new mws.Param('MarketplaceId', 'Id', true), new mws.ParamList('ASINList', 'ASIN')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetLowestOfferListingsForSKU: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetLowestOfferListingsForSKU', [new mws.Param('MarketplaceId', 'Id', true), new mws.ParamList('SellerSKUList', 'SellerSKU', true), new enums.ItemCondition('ItemCondition'), new mws.Bool('ExcludeMe', false, false)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetLowestOfferListingsForASIN: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetLowestOfferListingsForASIN', [new mws.Param('MarketplaceId', 'Id', true), new enums.ItemCondition('ItemCondition'), new mws.ParamList('ASINList', 'ASIN')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetMyPriceForSKU: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetMyPriceForSKU', [new mws.Param('MarketplaceId', 'Id', true), new mws.ParamList('SellerSKUList', 'SellerSKU', true), new enums.ItemCondition('ItemCondition')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetMyPriceForASIN: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetMyPriceForASIN', [new mws.Param('MarketplaceId', 'Id', true), new enums.ItemCondition('ItemCondition'), new mws.ParamList('ASINList', 'ASIN')], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetProductCategoriesForSKU: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetProductCategoriesForSKU', [new mws.Param('MarketplaceId', 'Id', true), new mws.Param('SellerSKU', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  GetProductCategoriesForASIN: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetProductCategoriesForASIN', [new mws.Param('MarketplaceId', 'Id', true), new mws.Param('ASIN', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request)
};

ProductsClient = (function(superClass) {
  extend(ProductsClient, superClass);

  function ProductsClient() {
    ProductsClient.__super__.constructor.apply(this, arguments);
  }

  ProductsClient.prototype.getServiceStatus = function(cb) {
    return this.invoke(new requests.GetServiceStatus(), {}, (function(_this) {
      return function(res) {
        var ref, ref1, status;
        status = (ref = (ref1 = res.result) != null ? ref1.Status : void 0) != null ? ref : null;
        return cb(status, res);
      };
    })(this));
  };

  ProductsClient.prototype.listMatchingProducts = function(arg, cb) {
    var context, marketplaceId, query, req;
    query = arg.query, context = arg.context, marketplaceId = arg.marketplaceId;
    req = new requests.ListMatchingProducts({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      Query: query,
      QueryContextId: context != null ? context : void 0
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getMatchingProduct = function(arg, cb) {
    var asins, marketplaceId, req;
    asins = arg.asins, marketplaceId = arg.marketplaceId;
    req = new requests.GetMatchingProduct({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      ASINList: asins != null ? asins : []
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getMatchingProductForId = function(arg, cb) {
    var idType, ids, marketplaceId, req;
    idType = arg.idType, ids = arg.ids, marketplaceId = arg.marketplaceId;
    req = new requests.GetMatchingProductForId({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      IdType: idType,
      IdList: ids
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getCompetitivePricingForSKU = function(arg, cb) {
    var marketplaceId, req, skus;
    skus = arg.skus, marketplaceId = arg.marketplaceId;
    req = new requests.GetCompetitivePricingForSKU({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      SellerSKUList: skus != null ? skus : []
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getCompetitivePricingForASIN = function(arg, cb) {
    var asins, marketplaceId, req;
    asins = arg.asins, marketplaceId = arg.marketplaceId;
    req = new requests.GetCompetitivePricingForASIN({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      ASINList: asins != null ? asins : []
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getLowestOfferListingsForSKU = function(arg, cb) {
    var condition, excludeMe, marketplaceId, req, skus;
    skus = arg.skus, condition = arg.condition, excludeMe = arg.excludeMe, marketplaceId = arg.marketplaceId;
    req = new requests.GetLowestOfferListingsForSKU({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      SellerSKUList: skus != null ? skus : [],
      ItemCondition: condition != null ? condition : void 0,
      ExcludeMe: excludeMe != null ? excludeMe : false
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getLowestOfferListingsForASIN = function(arg, cb) {
    var asins, condition, marketplaceId, req;
    asins = arg.asins, condition = arg.condition, marketplaceId = arg.marketplaceId;
    req = new requests.GetLowestOfferListingsForASIN({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      ASINList: asins != null ? asins : [],
      ItemCondition: condition != null ? condition : void 0
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getMyPriceForSKU = function(arg, cb) {
    var condition, marketplaceId, req, skus;
    skus = arg.skus, condition = arg.condition, marketplaceId = arg.marketplaceId;
    req = new requests.GetMyPriceForSKU({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      SellerSKUList: skus != null ? skus : [],
      ItemCondition: condition != null ? condition : void 0
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getMyPriceForASIN = function(arg, cb) {
    var asins, condition, marketplaceId, req;
    asins = arg.asins, condition = arg.condition, marketplaceId = arg.marketplaceId;
    req = new requests.GetMyPriceForASIN({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      ASINList: asins != null ? asins : [],
      ItemCondition: condition != null ? condition : void 0
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getProductCategoriesForSKU = function(arg, cb) {
    var marketplaceId, req, sku;
    sku = arg.sku, marketplaceId = arg.marketplaceId;
    req = new requests.GetProductCategoriesForSKU({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      SellerSKU: sku
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  ProductsClient.prototype.getProductCategoriesForASIN = function(arg, cb) {
    var asin, marketplaceId, req;
    asin = arg.asin, marketplaceId = arg.marketplaceId;
    req = new requests.GetProductCategoriesForASIN({
      MarketplaceId: marketplaceId != null ? marketplaceId : this.marketplaceId,
      ASIN: asin
    });
    return this.invoke(req, {}, (function(_this) {
      return function(res) {
        return cb(res);
      };
    })(this));
  };

  return ProductsClient;

})(mws.Client);

module.exports = {
  service: MWS_PRODUCTS,
  enums: enums,
  requests: requests,
  Client: ProductsClient
};
