require("dotenv").config();
const express = require("express");
const cors = require("cors");
const catRoutes = require("./routes/catRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", catRoutes);

module.exports = app;
