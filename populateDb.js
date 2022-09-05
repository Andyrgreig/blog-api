require("dotenv").config();
const Article = require("./models/article");
const User = require("./models/user");
const Comment = require("./models/comment");

// load data
let data = require("./data.json");

// Change date string to date object
for (i = 0; i < data.length; i++) {
  var x = new Date(data[i].date);
  data[i].date = x;
}

// Connect to database
var mongoose = require("mongoose");
const mongoDB = process.env.DB_STRING;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

function createArticle(data) {
  User.find({ username: data.author })
    .then((result, err) => {
      var newArticle = new Article({
        title: data.title,
        text: data.text,
        image: data.image,
        author: result[0],
        published: data.published,
        timestamp: data.date,
      });

      newArticle.save(function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("New article: " + newArticle.title);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Remove existing records
// Blog.deleteMany().then(() => {
//   data.forEach(createBlog);
// });

data.forEach(function (blog) {
  createArticle(blog);
});
