const util = require('util');
const { createClient } = require('../client-factory');

const client = createClient('inventory');

const call = (methodName, request) => {
  return util.promisify(client[methodName]).bind(client)(request);
};

module.exports = {
  checkStock: (productId, quantity) => call('checkStock', { productId, quantity }),
  deductStock: (productId, quantity) => call('deductStock', { productId, quantity }),
};

