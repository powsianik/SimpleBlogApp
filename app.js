const express = require('express');
const app = express();
const portForLocalhost = 4000;

app.get('/', (req, res) => {
    res.send("Main page");
});

app.listen(portForLocalhost, () => console.log("App is listetning on port " + portForLocalhost));