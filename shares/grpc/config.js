const path = require('path');

module.exports = {
  services: {
    inventory: {
      protoPath: path.join(__dirname, '../protos/inventory.proto'),
      packageName: 'inventory',
      serviceName: 'InventoryService',
      address: process.env.GRPC_INVENTORY_SERVICE_ADDR || 'localhost:50053',
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
