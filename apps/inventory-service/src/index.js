const express = require('express');
const connectDB = require('../../../shares/database/db');
const startGrpcServer = require('./grpc-server');
const productRouter = require('./modules/product/product-router');

const app = express();
app.use(express.json());

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/inventory_db');

// REST routes
app.use('/products', productRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Inventory REST Server running on port ${PORT}`);
});

startGrpcServer();
