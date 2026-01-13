const { createClient } = require('../client-factory');

const client = createClient('payment');

module.exports = {
  processPayment: (orderId, amount, currency = 'USD') => 
    client.call('processPayment', { orderId, amount, currency }),
};
