const inventoryHandler = require('./grpc-handlers/inventory-handler');
const { createServer } = require('../../../shares/grpc/server-factory');

const startGrpcServer = () => {
  const server = createServer('inventory', inventoryHandler);
  const GRPC_PORT = process.env.GRPC_PORT || 50053;
  server.start(GRPC_PORT);
};

module.exports = startGrpcServer;
