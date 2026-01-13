const { createClient } = require('../client-factory');

const client = createClient('inventory');

module.exports = {
  checkStock: (productId, quantity) => client.call('checkStock', { productId, quantity }),
  deductStock: (productId, quantity) => client.call('deductStock', { productId, quantity }),
};
