const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const portForLocalhost = 4000;

mongoose.connect('mongodb://localhost/blog_app');

var blogPostSchema = new mongoose.Schema({
    title: String,
    contentText: String,
    imgUrl: String,
    author: String,
    date: {type: Date, default: Date.Now}
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
app.get('/', (req, res) => {
    res.send("Main page");
});

app.listen(portForLocalhost, () => console.log("App is listetning on port " + portForLocalhost));