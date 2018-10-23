const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const app = express();
const portForLocalhost = 4000;

app.set("view engine", 'ejs');

app.use(methodOverride('_method'));
app.use(express.static("resources"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/blog_app');

var blogPostSchema = new mongoose.Schema({
    title: String,
    contentText: String,
    imgUrl: String,
    author: String,
    date: {type: Date, default: Date.now}
});

var BlogPost = mongoose.model('BlogPost', blogPostSchema);

//Adding first blog post to db:
/*
BlogPost.create({
    title:"First blog post.",
    contentText: "Loren ipsum etc.",
    imgUrl: "https://images.pexels.com/photos/1480799/pexels-photo-1480799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    author: "Mr. Author"
}, (err, blogPost) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("BlogPost saved");
        console.log(blogPost);
    }
});
*/

//ROUTES ===================================================================================================
app.get('/blogposts', (req, res) => {
    BlogPost.find({}, (err, blogposts) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", {blogposts: blogposts});
        }
    });
});

app.get('/blogposts/new', (req, res) => {
    res.render("new");
});

app.post('/blogposts', (req, res) => {
    BlogPost.create(req.body.blogPost, (err, blogPost) => {
        if (err) {
            console.log("Something went wrong while creating new post: " + err);
        } else {
            console.log("Created new post!");
        }
    });

    res.redirect("/blogposts");
});

app.get("/blogposts/:id", (req, res) => {
    BlogPost.findById(req.params.id, (err, blogpost) => {
        if (err) {
            console.log("Something went wrong while showing post: " + err);
        } else {
            res.render("show", {post:blogpost});
        }
    });
});

app.get("/blogposts/:id/edit", (req, res) =>{
    BlogPost.findById(req.params.id, (err, blogpost) => {
        if (err) {
            console.log("Something went wrong while editing post: " + err);
        } else {
            res.render("edit", {post:blogpost});
        }
    });
});

app.put("/blogposts/:id", (req, res) => {
    BlogPost.findByIdAndUpdate(req.params.id, req.body.blogPost, (err, blogPost) => {
        if(err){
            console.log("Something went wrong while updating: " + err);
        }
        else{
            console.log("succes!");
            res.redirect("/blogposts/"+blogPost._id);
        }
    })
});

app.delete("/blogposts/:id", (req, res) =>{
   BlogPost.deleteOne({_id: req.params.id}, (err) =>{
        if(err){
            console.log("Something went wrong while deleting: " + err);
        }
        else{
            res.redirect("/blogposts");
        }
    });
});

app.listen(portForLocalhost, () => console.log("App is listetning on port " + portForLocalhost));