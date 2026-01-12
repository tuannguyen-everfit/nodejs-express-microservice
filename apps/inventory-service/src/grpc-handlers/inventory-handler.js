const grpc = require('@grpc/grpc-js');
const productService = require('../modules/product/product-service');

const checkStock = async (call, callback) => {
  try {
    const { productId, quantity } = call.request;
    const result = await productService.checkStock(productId, quantity);
    callback(null, result);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

const deductStock = async (call, callback) => {
  try {
    const { productId, quantity } = call.request;
    const result = await productService.deductStock(productId, quantity);
    callback(null, result);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

module.exports = {
  checkStock,
  deductStock,
};
