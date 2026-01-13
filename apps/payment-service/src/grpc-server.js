const paymentHandler = require('./grpc-handlers/payment-handler');
const { createServer } = require('../../../shares/grpc/server-factory');

const startGrpcServer = () => {
  const server = createServer('payment', paymentHandler);
  const GRPC_PORT = process.env.GRPC_PORT || 50054;
  server.start(GRPC_PORT);
};

module.exports = startGrpcServer;
