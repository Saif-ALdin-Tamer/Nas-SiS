const mongoose = require("mongoose");
const { logger } = require("../utils/logger");

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    const error = new Error("MONGO_URI is required to connect to MongoDB.");
    logger.error(error.message);
    throw error;
  }

  try {
    await mongoose.connect(mongoUri);
    logger.info("MongoDB connected successfully.");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;
