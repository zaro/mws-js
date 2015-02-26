(function() {
  var feeds, xf;

  feeds = require('../lib/feeds');

  xf = new feeds.XMLFeeds('ASD');

  console.log(xf.orderFulfillment([
    {
      AmazonOrderID: '123-345-567',
      Item: [
        {
          AmazonOrderItemCode: 'code1',
          Quantity: '3'
        }, {
          AmazonOrderItemCode: 'code5',
          Quantity: '1'
        }, {
          AmazonOrderItemCode: 'code2',
          Quantity: '7'
        }
      ]
    }
  ]));

}).call(this);

//# sourceMappingURL=xml_feeds.js.map
