var client, dump, loginInfo, print, products, ref, util;

products = require('../lib/products');

util = require('util');

ref = require('./cfg'), loginInfo = ref.loginInfo, dump = ref.dump, print = ref.print;

client = new products.Client(loginInfo);

client.getServiceStatus((function(_this) {
  return function(status, res) {
    print("Products service status", status);
    if (status !== 'GREEN' && status !== 'GREEN_I') {
      throw 'Products service is having issues, aborting...';
    }
    return client.getMatchingProductForId({
      idType: 'ASIN',
      ids: 'B00BY7IZQE'
    }, function(res) {
      if (res.error) {
        return console.error(res.error);
      } else if (res.result) {
        return console.log(util.inspect(res.result, false, 10));
      }
    });
  };
})(this));
