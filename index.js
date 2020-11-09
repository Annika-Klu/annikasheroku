require('dotenv').config()

const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

app.get('/', function(req, res) {

    console.log(`A request was made to the home endpoint!`)

    res.json({
        status: 'ok',
        description: `it's ok what else can I say...`
    })
})

app.get('/dbtest', function(req, res) {

    connection.query(`SELECT * FROM offices`, function(error, result) {

        if (error) {
            res.json({
                status: 'error',
                description: `couldn't select all from offices`
            })
        }
    
        res.json(result)
    
    })
})

app.get('/api/employees', function(req, res) {

    connection.query(`SELECT * FROM employees`, function(error, result) {

        if (error) {
            res.json({
                status: 'error',
                description: `couldn't select all from employees`
            })
        }
    
        res.json(result)
    
    })
})

app.get('/api/employees/:id', function(req, res) {

    const id = req.params.id;

    connection.query(`SELECT * FROM employees WHERE employeeNumber = ?`, [id], function(error, result) {
        
        if (error) {
            res.json({
                status: 'error',
                description: `Could not select all from epmployees with given employeeNo.`
            })
        }

        res.json(result)
    
    })
})

//HOMEWORK: on another endpoint, create post request that adds an entry to the database

app.post('/api/employees/new', function(req, res) {

   const body = req.body;
   console.log(body);
   const id = body.employeeNumber;
   const last = body.lastName;
   const first = body.firstName;
   const extension = body.extension;
   const email = body.email;
   const officeCode = body.officeCode;
   const jobTitle = body.jobTitle;

   //as recommended by Helder, I changed the insert string to query parameters (?, ?, ?) so I won't have to worry about
   //adding quotes to string data if I use template strings (e. g. "${first}", "${last}")

   let insert = `INSERT INTO employees (employeeNumber, lastName, firstName, extension, email, officeCode, jobTitle)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
   
   connection.query(insert, [id, last, first, extension, email, officeCode, jobTitle], function(error, result) {
        
      if (error) {
          res.json({
              status: 'error',
              description: `it's an error, try again later`
          })
      }  
      console.log(error);

    // TO DO: I'd like to check if the selected employeeNo. is already taken, and if it is, I don't want the insertion to happen
    //I assume another connection.query does not work the way I tried below since it requires another function (err, result)? 
    //How could I handle this?

    //  else if (connection.query(`SELECT lastName FROM employees WHERE employeeNumber = ${id}`) != NULL) {
    //      res.json({
    //          status: 'invalid request',
    //          description: `the id you have indicated and/or the employee you wish to add to the database already exist`
    //      })
    //  } else

      res.json(result)
  
  })       
       
})


app.listen(port, function() {
    console.log(`running on port ${port}`)
})

//first setup when making project run hosted by heroku
//----------------------------------------------------

// const express = require('express');

// const app = express();
// const port = process.env.PORT || 3000;

// //request handlers

// app.get('/test', function(req, res) {
//    res.json("Hi!");
// });

// //listener

// app.listen(port, function() {
//     console.log(`Heroku app listening at https://annikasheroku.herokuapp.com/`);
//   });


  //nmp i dotenv: enables you to create invis. .env file in root where you can store connection and pw information
  //and the info will be applied to main code in proper syntax.
  //of course the .env file itself shouldn't be shared or pushed to gitHub > pw, username etc. remain with you
  //after installing npm package it can be quickly applied by saying reqire.'dotenv'.config()