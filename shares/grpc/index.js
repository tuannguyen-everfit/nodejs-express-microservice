const inventoryClient = require('./clients/inventory-client');
const clientFactory = require('./client-factory');
const serverFactory = require('./server-factory');
const errorMapper = require('./error-mapper');

module.exports = {
  inventoryClient,
  ...clientFactory,
  ...serverFactory,
  ...errorMapper,
};
