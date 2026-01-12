const productRepository = require('./product-repository');

class ProductService {
  async checkStock(productId, quantity) {
    const product = await productRepository.findById(productId);
    if (!product) throw new Error('Product not found');
    
    return {
      isAvailable: product.stock >= quantity,
      currentStock: product.stock
    };
  }

  async deductStock(productId, quantity) {
    const product = await productRepository.findById(productId);
    if (!product) throw new Error('Product not found');
    
    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    await productRepository.updateStock(productId, -quantity);
    return { success: true, message: 'Stock deducted successfully' };
  }

  async getAllProducts() {
    return await productRepository.findAll();
  }

  async addProduct(productData) {
    return await productRepository.create(productData);
  }
}

module.exports = new ProductService();

