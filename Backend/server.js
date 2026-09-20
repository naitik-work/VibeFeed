const path = require("path");
const dotenv = require("dotenv");

// Load .env from both Backend root and Backend/src
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "src", ".env") });

const app = require("./src/app");
const connectToDb = require("./src/config/database");

// Connect to MongoDB
connectToDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}.`);
});
