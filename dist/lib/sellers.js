var MWS_SELLERS, SellersClient, mws, requests, types,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

mws = require('./core');

MWS_SELLERS = new mws.Service({
  name: "Sellers",
  group: "Sellers Retrieval",
  path: "/Sellers/2011-07-01",
  version: "2011-07-01",
  legacy: false
});

types = {
  ServiceStatus: mws.types.ServiceStatus
};

requests = {
  GetServiceStatus: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_SELLERS, 'GetServiceStatus', [], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  ListMarketplaceParticipations: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_SELLERS, 'ListMarketplaceParticipations', [], {}, null, init);
    }

    return _Class;

  })(mws.Request),
  ListMarketplaceParticipationsByNextToken: (function(superClass) {
    extend(_Class, superClass);

    function _Class(init) {
      _Class.__super__.constructor.call(this, MWS_SELLERS, 'ListMarketplaceParticipationsByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
    }

    return _Class;

  })(mws.Request)
};

SellersClient = (function(superClass) {
  extend(SellersClient, superClass);

  function SellersClient() {
    return SellersClient.__super__.constructor.apply(this, arguments);
  }

  SellersClient.prototype.getServiceStatus = function(cb) {
    return this.invoke(new requests.GetServiceStatus(), {}, (function(_this) {
      return function(res) {
        var ref, ref1, status;
        status = (ref = (ref1 = res.result) != null ? ref1.Status : void 0) != null ? ref : null;
        return cb(status, res);
      };
    })(this));
  };

  SellersClient.prototype.listMarketplaceParticipations = function(cb) {
    var opt, req;
    opt = {
      nextTokenCall: requests.ListMarketplaceParticipationsByNextToken
    };
    req = new requests.ListMarketplaceParticipations();
    return this.invoke(req, opt, (function(_this) {
      return function(res) {
        var markets, partips, ref, ref1, ref2, ref3;
        markets = (ref = res != null ? (ref1 = res.ListMarketplaces) != null ? ref1.Marketplace : void 0 : void 0) != null ? ref : null;
        partips = (ref2 = res != null ? (ref3 = res.ListParticipations) != null ? ref3.Participation : void 0 : void 0) != null ? ref2 : null;
        return cb({
          marketplaces: markets,
          participations: partips
        }, res);
      };
    })(this));
  };

  SellersClient.prototype.listMarketplaceParticipationsByNextToken = function(token, cb) {
    var opt, req;
    opt = {
      nextTokenCall: requests.ListMarketplaceParticipationsByNextToken
    };
    req = new requests.ListMarketplaceParticipationsByNextToken({
      NextToken: token
    });
    return this.invoke(req, opt, (function(_this) {
      return function(res) {
        var markets, partips, ref, ref1, ref2, ref3;
        markets = (ref = res != null ? (ref1 = res.ListMarketplaces) != null ? ref1.Marketplace : void 0 : void 0) != null ? ref : null;
        partips = (ref2 = res != null ? (ref3 = res.ListParticipations) != null ? ref3.Participation : void 0 : void 0) != null ? ref2 : null;
        return cb({
          marketplaces: markets,
          participations: partips
        }, res);
      };
    })(this));
  };

  return SellersClient;

})(mws.Client);

module.exports = {
  service: MWS_SELLERS,
  types: types,
  requests: requests,
  Client: SellersClient
};
