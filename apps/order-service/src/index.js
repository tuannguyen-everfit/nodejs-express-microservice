const express = require('express');
const connectDB = require('../../../shares/database/db');
const orderRouter = require('./modules/order/order-router');

const app = express();
app.use(express.json());

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/order_db');

// REST routes
app.use('/orders', orderRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Order REST Server running on port ${PORT}`);
});
