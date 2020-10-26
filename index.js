const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//request handlers

app.get('/test', function(req, res) {
   res("Hi!");
});

//listener

app.listen(port, function() {
    console.log(`Heroku app listening at https://annikasheroku.herokuapp.com/`);
  });