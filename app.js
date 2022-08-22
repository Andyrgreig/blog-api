require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const commentRouter = require("./routes/comment");

// Database connection
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

// Routes

app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT, () => console.log("Server started"));
