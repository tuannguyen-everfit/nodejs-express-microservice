const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('./config');

/**
 * Creates and starts a gRPC server for a given service
 * @param {string} serviceKey - Key from config.js (e.g., 'inventory')
 * @param {Object} handlers - Implementation of the service methods
 * @returns {Promise<grpc.Server>}
 */
const createServer = (serviceKey, handlers) => {
  const serviceConfig = config.services[serviceKey];
  if (!serviceConfig) {
    throw new Error(`Service configuration for ${serviceKey} not found`);
  }

  const packageDefinition = protoLoader.loadSync(
    serviceConfig.protoPath,
    config.loaderOptions
  );

  const proto = grpc.loadPackageDefinition(packageDefinition)[serviceConfig.packageName];
  const server = new grpc.Server();

  // Add the service implementation
  server.addService(proto[serviceConfig.serviceName].service, handlers);

  return {
    start: (port = null) => {
      const bindPort = port || serviceConfig.address.split(':')[1] || 50051;
      server.bindAsync(
        `0.0.0.0:${bindPort}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
          if (err) {
            console.error(`gRPC Server [${serviceKey}] error: ${err.message}`);
            return;
          }
          console.log(`gRPC Server [${serviceKey}] running on port ${port}`);
          server.start();
        }
      );
    },
    server // Return the server instance for potential shutdown or other uses
  };
};

module.exports = { createServer };
