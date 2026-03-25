import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// load env
dotenv.config();

const app = express();

// env variables
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// DB connect
connectDB();

// route
app.get("/", (req, res) => {
    res.send("Hello mediOne! Server is running with DB");
});

// server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});