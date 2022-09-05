require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const cors = require("cors");

const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");

// Database connection
require("./config/database");

// Pass the global passport object into the configuration function
require("./config/passport")(passport);

// Initialise the passport object on every request
app.use(passport.initialize());

//Enable cross origin requests
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/users", userRouter);
app.use("/articles", articleRouter);

// Start server
app.listen(process.env.PORT, () => console.log("Server started"));
