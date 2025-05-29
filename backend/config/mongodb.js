const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URI}/${process.env.DBNAME}`, {})
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
      });
    console.log(`Server Running On ${mongoose.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectMongo;
