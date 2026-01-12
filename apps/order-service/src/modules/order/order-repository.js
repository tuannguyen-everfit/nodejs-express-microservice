const Order = require('../../models/order');

class OrderRepository {
  async create(orderData) {
    const order = new Order(orderData);
    return await order.save();
  }

  async findById(id) {
    return await Order.findById(id);
  }

  async updateStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
  }
}

module.exports = new OrderRepository();

