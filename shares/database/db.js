const mongoose = require('mongoose');

const connectDB = async (customUri) => {
  const uri = customUri || process.env.MONGO_URI || 'mongodb://localhost:27017/microservices';
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB Connected to ${uri}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

