const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const portForLocalhost = 4000;

mongoose.connect('mongodb://localhost/blog_app');

app.get('/', (req, res) => {
    res.send("Main page");
});

app.listen(portForLocalhost, () => console.log("App is listetning on port " + portForLocalhost));