const grpc = require('@grpc/grpc-js');

/**
 * Maps application errors to gRPC error objects
 * @param {Error} error - The caught application error
 * @returns {Object} gRPC error object with code and details
 */
const mapToGrpcError = (error) => {
  const message = error.message.toLowerCase();

  // Mapping logic based on error message or instance
  if (message.includes('not found')) {
    return {
      code: grpc.status.NOT_FOUND,
      details: error.message,
    };
  }

  if (message.includes('insufficient') || message.includes('available')) {
    return {
      code: grpc.status.FAILED_PRECONDITION,
      details: error.message,
    };
  }

  if (message.includes('invalid') || message.includes('required')) {
    return {
      code: grpc.status.INVALID_ARGUMENT,
      details: error.message,
    };
  }

  // Default error
  return {
    code: grpc.status.INTERNAL,
    details: error.message || 'Internal Server Error',
  };
};

module.exports = { mapToGrpcError };
