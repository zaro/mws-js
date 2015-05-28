var client, dump, loginInfo, print, ref, sellers;

sellers = require('../lib/sellers');

ref = require('./cfg'), loginInfo = ref.loginInfo, dump = ref.dump, print = ref.print;

client = new sellers.Client(loginInfo);

client.getServiceStatus((function(_this) {
  return function(status, res) {
    print("Sellers service status", status);
    if (status !== 'GREEN' && status !== 'GREEN_I') {
      throw 'Seller service is having issues, aborting...';
    }
    return client.listMarketplaceParticipations(function(goodies, res) {
      print("The good stuff", goodies);
      return dump(res);
    });
  };
})(this));
