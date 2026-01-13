const { mapToGrpcError } = require('../../../../shares/grpc/error-mapper');

const processPayment = async (call, callback) => {
  try {
    const { orderId, amount } = call.request;
    
    console.log(`Processing payment for order ${orderId} with amount ${amount}`);

    // Simulate payment logic
    if (amount <= 0) {
      throw new Error('Invalid amount: Amount must be greater than zero');
    }

    if (amount > 1000) {
      throw new Error('Payment failed: Insufficient funds');
    }

    // Simulate success
    callback(null, {
      success: true,
      transactionId: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      message: 'Payment processed successfully'
    });
  } catch (error) {
    callback(mapToGrpcError(error));
  }
};

module.exports = {
  processPayment,
};
