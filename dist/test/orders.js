var client, dump, loginInfo, orders, print, ref;

orders = require('../lib/orders');

ref = require('./cfg'), loginInfo = ref.loginInfo, dump = ref.dump, print = ref.print;

client = new orders.Client(loginInfo);

client.getServiceStatus((function(_this) {
  return function(status, res) {
    print("Orders Service Status", status);
    if (status !== 'GREEN') {
      print("Abnormal ServiceStatus response", res);
      return console.log("aborting...");
    }
    return client.listOrders({
      CreatedAfter: '10-01-2011'
    }, function(orders, res) {
      var order, size;
      if (orders) {
        if (Array.isArray(orders)) {
          order = orders[0];
          size = orders.length;
        } else {
          order = orders;
          size = 1;
        }
        print("First order of " + size + " returned", order);
      } else {
        print("Invalid or empty ListOrders response", res);
      }
      if (res.nextToken != null) {
        print("Requesting additional orders using formal NextToken request", res.nextToken);
        client.listOrdersByNextToken(res.nextToken, function(orders, res) {
          var ref1;
          if (orders) {
            console.log("Retrieved " + ((ref1 = orders.length) != null ? ref1 : 1) + " order(s)");
          } else {
            print("NextToken response with no orders", res);
          }
          if (res.nextToken != null) {
            return res.getNext(function(orders, res) {
              var ref2;
              return "Retrieved " + ((ref2 = orders.length) != null ? ref2 : 1) + " order(s)";
            });
          }
        });
      }
      client.getOrder(order.AmazonOrderId, function(o, res) {
        print("Order returned by GetOrder", o);
        return print("Matches order from before", order.AmazonOrderId === o.AmazonOrderId);
      });
      return client.listOrderItems(orders[5].AmazonOrderId, function(items, res) {
        print("Order items for " + orders[5].AmazonOrderId + " (fifth result from before)", items);
        if (res.nextToken != null) {
          return res.getNext(dump);
        }
      });
    });
  };
})(this));
