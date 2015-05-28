var mws;

mws = require('./lib/core');

mws.fba = require('./lib/fba');

mws.feeds = require('./lib/feeds');

mws.orders = require('./lib/orders');

mws.products = require('./lib/products');

mws.reports = require('./lib/reports');

mws.sellers = require('./lib/sellers');

module.exports = mws;
