const startGrpcServer = require('./grpc-server');

console.log('Payment Service is starting...');

// Connect to MongoDB and start gRPC server
startGrpcServer();
