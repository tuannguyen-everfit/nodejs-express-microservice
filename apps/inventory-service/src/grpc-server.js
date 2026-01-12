const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const inventoryHandler = require('./grpc-handlers/inventory-handler');
const config = require('../../../shares/grpc/config');

const PROTO_PATH = config.services.inventory.protoPath;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, config.loaderOptions);
const inventoryProto = grpc.loadPackageDefinition(packageDefinition).inventory;

const startGrpcServer = () => {
  const server = new grpc.Server();
  server.addService(inventoryProto.InventoryService.service, inventoryHandler);
  
  const GRPC_PORT = process.env.GRPC_PORT || 50053;
  server.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(`gRPC Server error: ${err.message}`);
      return;
    }
    console.log(`Inventory gRPC Server running on port ${port}`);
    server.start();
  });
};

module.exports = startGrpcServer;
