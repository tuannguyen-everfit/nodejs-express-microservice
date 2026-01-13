const path = require('path');

module.exports = {
  services: {
    inventory: {
      protoPath: path.join(__dirname, './protos/inventory.proto'),
      packageName: 'inventory',
      serviceName: 'InventoryService',
      address: process.env.GRPC_INVENTORY_SERVICE_ADDR || 'localhost:50053',
    },
    payment: {
      protoPath: path.join(__dirname, './protos/payment.proto'),
      packageName: 'payment',
      serviceName: 'PaymentService',
      address: process.env.GRPC_PAYMENT_SERVICE_ADDR || 'localhost:50054',
    }
  },
  loaderOptions: {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
};
