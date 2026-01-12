const Product = require('../../models/product');

class ProductRepository {
  async findById(id) {
    return await Product.findById(id);
  }

  async updateStock(id, quantity) {
    return await Product.findByIdAndUpdate(
      id, 
      { $inc: { stock: quantity } }, 
      { new: true }
    );
  }

  async findAll() {
    return await Product.find({});
  }

  async create(productData) {
    const product = new Product(productData);
    return await product.save();
  }
}

module.exports = new ProductRepository();

