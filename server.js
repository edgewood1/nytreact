// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

// Require History Schema
var Article = require("./models/Article.js");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
// var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
// and this was extended false in 3.14 server file - 
app.use(bodyParser.urlencoded({ extended: false }));


// next 3 were not included in day 3 14 server.js file
// app.use(bodyParser.json());
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/articles");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
// app.get("/api", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
//   History.find({}).sort([
//     ["date", "descending"]
//   ]).limit(5).exec(function(err, doc) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send(doc);
//     }
//   });
// });

app.get('/api/saved', function(req, res) {

  Article.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});


app.post('/api/saved', function(req, res){
console.log("here " +req.body.title);

Article.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function (err) {
    if(err){
      console.log(err);
    } else {
      res.send("Saved Article");
    }
  });

});

// This is the route we will send POST requests to save each search.
// app.post("/api", function(req, res) {
//   console.log("BODY: " + req.body.location);

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
//   History.create({
//     location: req.body.location,
//     date: Date.now()
//   }, function(err) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send("Saved Search");
//     }
//   });
// });

// -------------------------------------------------

// Listener - was
// app.listen(PORT, function() {
//   console.log("App listening on PORT: " + PORT);
// });

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
