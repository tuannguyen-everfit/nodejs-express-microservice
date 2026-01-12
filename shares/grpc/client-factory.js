const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
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
  
  return new proto[serviceConfig.serviceName](
    serviceConfig.address,
    grpc.credentials.createInsecure()
  );
};

module.exports = { createClient };

