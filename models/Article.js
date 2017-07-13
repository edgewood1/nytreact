var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String, 
    trim: true, 
    // required: true
  },
  date: {
    type: Date,
    trim: true,
    // required: true

  },
  url: {
    type: String, 
    // required: true
  }
});

var Article = mongoose.model("History", ArticleSchema);
module.exports = Article;
