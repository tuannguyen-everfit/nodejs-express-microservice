const orderRepository = require('./order-repository');
const { inventoryClient, paymentClient } = require('../../../../../shares/grpc');

class OrderService {
  async createOrder(orderData) {
    const { productId, quantity, pricePerUnit } = orderData;
    const amount = quantity * pricePerUnit;

    // 1. Check stock via gRPC
    const stockStatus = await inventoryClient.checkStock(productId, quantity);
    
    if (!stockStatus.isAvailable) {
      throw new Error(`Insufficient stock. Available: ${stockStatus.currentStock}`);
    }

    // 2. Create order in PENDING status
    const order = await orderRepository.create({
      productId,
      quantity,
      totalPrice: amount,
      status: 'PENDING'
    });

    try {
      // 3. Deduct stock via gRPC
      await inventoryClient.deductStock(productId, quantity);

      // 4. Process Payment via gRPC (New Service)
      const paymentResult = await paymentClient.processPayment(order._id.toString(), amount);
      
      if (!paymentResult.success) {
        throw new Error(`Payment failed: ${paymentResult.message}`);
      }
      
      // 5. Update order to COMPLETED
      return await orderRepository.updateStatus(order._id, 'COMPLETED');
    } catch (error) {
      // 6. If anything fails, cancel the order
      await orderRepository.updateStatus(order._id, 'CANCELLED');
      throw new Error(`Order failed: ${error.message}`);
    }
  }

  async getOrder(id) {
    return await orderRepository.findById(id);
  }
}

module.exports = new OrderService();

