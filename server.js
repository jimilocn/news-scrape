var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
// var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

var router=express.Router();
require("./config/routes")(router);
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
    extended: false
}));
app.use(router);
app.use(express.json());
// Make public a static folder
app.use(express.static(__dirname+"public"));


// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

app.get("/scrape", function (request, response) {

    axios.get("https://gawker.com/tag/gossip").then(function (res) {
        var $ = cheerio.load(res.data);

        $("article h1").each(function (i, element) {
            var article = {};

            article.title = $(this).children("a").text();
            article.link = $(this).children("a").attr("href");

            db.Article.create(article).then(function (dbArticle) {
                console.log(dbArticle)
            }).catch(function (error) {
                console.log(error)
            })

        })
        res.send("scrape completed");
    })
})


app.get("articles", function (request, response) {
    db.Article.find({}).then(function (dbArticle) {
        res.json(dbArticle)
    }).catch(function (error) {
        res.json(error)
    })
})

app.get("/articles/:id", function(request, response){
    db.Article.findOne({_id: request.params.id}).populate("note").then(function(dbArticle){
        res.json(dbArticle)
    }).catch(function(error){
        res.json(error)
    })
})

app.post("/articles/:id", function(request, response){

    db.Note.create(req.body).then(function(dbNote){
return db.Article.findOneAndUpdate({_id:req.params.id},{note: dbNote._id}, {new: true})

    }).then(function(dbArticle){
        res.json(dbArticle)
    }).catch(function(error){
        res.json(error)
    })
})



app.listen(PORT, function () {
    console.log("App running on port https://localhost:" + PORT + "!");
});