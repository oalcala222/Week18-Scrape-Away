// ==============Dependencies=============== //
var express = require("express");
var path = require("path")
var logger = require("morgan");
var mongoose = require("mongoose");

// ==========Our scraping tools============= //
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// ===========Require all models============ //
var db = require("./models");

// =====Associate our server to a port====== //
var PORT = 3000;

// ===========Initialize Express============ //
var app = express();

// ==========Configure middleware=========== //
// Serve static content from the "public" directory in the application directory.
app.use(express.static("public"));
// Parse request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use morgan logger for logging requests
app.use(logger("dev"));


// ==========Configure handlebars=========== //
// view engine setup to use "views"
//app.set("views", path.join(__dirname, "views"));
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// ============Database Connection========== //
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || ("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });
mongoose.connect(MONGODB_URI);

// =================Routes================== //
// Import the route/controller combo and give the server access to them.
require("./controllers/scrapecontroller.js")(app);


// ============Start the server============= //
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
  
module.exports = app;