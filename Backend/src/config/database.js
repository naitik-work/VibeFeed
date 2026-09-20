const mongoose = require("mongoose");

async function connectToDb() {
    const uri = process.env.MONGO_URI;
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        console.warn("Please verify MONGO_URI in your .env file and ensure MongoDB is running.");
    }
}

module.exports = connectToDb;