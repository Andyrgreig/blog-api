require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");

const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const commentRouter = require("./routes/comment");

// Database connection
require("./config/database");
// mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("Connected to database"));

// Pass the global passport object into the configuration function
require("./config/passport")(passport);

// Initialise the passport object on every request
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);

// Start server
app.listen(process.env.PORT, () => console.log("Server started"));
