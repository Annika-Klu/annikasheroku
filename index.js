const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//request handlers

app.get('/test', function(req, res) {
   res.json("Hi!");
});

//listener

app.listen(port, function() {
    console.log(`Heroku app listening at https://annikasheroku.herokuapp.com/`);
  });


  //nmp i dotenv: enables you to create invis. .env file in root where you can store connection and pw information
  //and the info will be applied to main code in proper syntax.
  //of course the .env file itself shouldn't be shared or pushed to gitHub > pw, username etc. remain with you
  //after installing npm package it can be quickly applied by saying reqire.'dotenv'.config()