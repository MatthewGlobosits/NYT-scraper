var express = require("express");
var  mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars")
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, function(error){
    if (error){
        console.log(error);
    } else {
        console.log("mongoose connected");
    }
});

app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});