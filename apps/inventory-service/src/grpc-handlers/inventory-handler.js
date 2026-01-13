const productService = require('../modules/product/product-service');
const { mapToGrpcError } = require('../../../../shares/grpc/error-mapper');

const checkStock = async (call, callback) => {
  try {
    const { productId, quantity } = call.request;
    const result = await productService.checkStock(productId, quantity);
    callback(null, result);
  } catch (error) {
    callback(mapToGrpcError(error));
  }
};

const deductStock = async (call, callback) => {
  try {
    const { productId, quantity } = call.request;
    const result = await productService.deductStock(productId, quantity);
    callback(null, result);
  } catch (error) {
    callback(mapToGrpcError(error));
  }
};

module.exports = {
  checkStock,
  deductStock,
};
