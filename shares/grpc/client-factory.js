const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const util = require('util');
const config = require('./config');

const createClient = (serviceKey) => {
  const serviceConfig = config.services[serviceKey];
  if (!serviceConfig) {
    throw new Error(`Service configuration for ${serviceKey} not found`);
  }

  const packageDefinition = protoLoader.loadSync(
    serviceConfig.protoPath, 
    config.loaderOptions
  );
  
  const proto = grpc.loadPackageDefinition(packageDefinition)[serviceConfig.packageName];
  
  const client = new proto[serviceConfig.serviceName](
    serviceConfig.address,
    grpc.credentials.createInsecure()
  );

  // Add a helper method to call service methods with Promises
  client.call = (methodName, request) => {
    if (typeof client[methodName] !== 'function') {
      throw new Error(`Method ${methodName} not found on gRPC client ${serviceKey}`);
    }
    return util.promisify(client[methodName]).bind(client)(request);
  };

  return client;
};

module.exports = { createClient };

