const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//request handlers

//listener

app.listen(port, function() {
    console.log(`Heroku app listening at http://localhost:${port}`);
  });