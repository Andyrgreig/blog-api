require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Database connection
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

app.listen(3000, () => console.log("server started"));
