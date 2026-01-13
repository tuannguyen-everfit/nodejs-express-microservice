const startGrpcServer = require('./grpc-server');

console.log('Payment Service is starting...');

// Trong thực tế sẽ có kết nối DB và Express REST API ở đây nếu cần
// Ở đây chúng ta chỉ chạy gRPC Server để demo
startGrpcServer();
