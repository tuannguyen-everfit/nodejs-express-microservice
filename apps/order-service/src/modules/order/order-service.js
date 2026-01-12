const orderRepository = require('./order-repository');
const { inventoryClient } = require('../../../../../shares/grpc');

class OrderService {
  async createOrder(orderData) {
    const { productId, quantity, pricePerUnit } = orderData;

    // 1. Check stock via gRPC
    const stockStatus = await inventoryClient.checkStock(productId, quantity);
    
    if (!stockStatus.isAvailable) {
      throw new Error(`Insufficient stock. Available: ${stockStatus.currentStock}`);
    }

    // 2. Create order in PENDING status
    const order = await orderRepository.create({
      productId,
      quantity,
      totalPrice: quantity * pricePerUnit,
      status: 'PENDING'
    });

    try {
      // 3. Deduct stock via gRPC
      await inventoryClient.deductStock(productId, quantity);
      
      // 4. Update order to COMPLETED
      return await orderRepository.updateStatus(order._id, 'COMPLETED');
    } catch (error) {
      // 5. If stock deduction fails, cancel the order
      await orderRepository.updateStatus(order._id, 'CANCELLED');
      throw new Error(`Order failed due to inventory error: ${error.message}`);
    }
  }

  async getOrder(id) {
    return await orderRepository.findById(id);
  }
}

module.exports = new OrderService();

