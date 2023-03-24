const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
app.use(bodyParser.urlencoded({extended:true}));

const articleSchema = {
    title: String,
    content: String
}
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(function (req, res) {
    Article.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})
.post(function(req,res){
    const newTitle=req.body.title;
    const newContent=req.body.content;
    const newArticle=new Article({
        title:newTitle,
        content:newContent
    });
    newArticle.save()
    .then(()=>{
        res.send("Successfully added a new article.");
    })
    .catch((err)=>{
        res.send(err);
    })
})
.delete(function(req,res){
    Article.deleteMany({})
    .then(()=>{
        res.send("Deleted all documents from Collection");
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.route("/articles/:articleTitle")
.get(function(req,res){
    Article.findOne({title:req.params.articleTitle})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})
.put(function(req,res){
    Article.updateMany({title:req.params.articleTitle},{title:req.body.title,content:req.body.content})
    .then(()=>{
        res.send("Updated Successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
})
.patch(function(req,res){
    Article.updateMany({title:req.params.articleTitle},{$set:req.body})
    .then(()=>{
        res.send("Successfully updated the database");
    })
    .catch((err)=>{
        console.log(err);
    })
})
.delete(function(req,res){
    Article.deleteMany({title:req.params.articleTitle})
    .then(()=>{
        res.send("Deleted the item successfully");
    })
    .catch((err)=>{
        res.send(err);
    })
})
// .post(function(req,res){

// })
// .delete(function(req,res){

// })

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});