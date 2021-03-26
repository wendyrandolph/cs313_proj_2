
const express = require('express');
const session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 5000;
const https = require("https");
const router = require("router");
const bodyParser = require("body-parser");
const request = require("request")
const ejs = require('ejs');
const fs = require('fs');
const axios = require('axios')
const env = require('dotenv');

////Place to allow for a database connection if needed 
// const { Pool } = require("pg");
// const connectionString = process.env.DATABASE_URL || "postgres://postgres:Honey001@localhost:5432/project_2";
// const pool = new Pool({
//   connectionString: connectionString
// });
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs


const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleware helpers 
app.use(express.json()) // => req.body
app.use(express.urlencoded({ extended: false }));


//Routes 
app.get('/', (req, res) => {
  res.render('index')
});


//Post the username somewhere... 
app.post('/createUser', function (req, res, next) {
  var username = req.body.username
  req.session.username = username

  var params = { username: username }
  //console.log(req.session.username)
  res.render('pages/game.ejs', params);
})

app.get('/getAPI', function (req, res, next) {
  username = req.session.username;

  var params = { username: username }
 //console.log("This is the getAPI endpoint and the session username is" + username)

  var params = { username: username }
  res.render('pages/display.ejs', params)
})
  .on("error", err => {
    console.log("Something went wrong with displaying the API");
    console.log("Error: " + err.message);
  });


app.get('/getCategory', function (req, res, next) {
  res.render('pages/category.ejs')
})

app.get('/end', function (req, res, next) {
  username = req.session.username;

  var params = { username: username }
  //console.log(params);
  res.render('pages/end.ejs', params)
})

app.get('/scores', function (req, res, next) {
  username = req.session.username;

  
  var params = { username: username }
  res.render('pages/highscore.ejs', params)
})

app.get('/playAgain', function (req, res, next) {
  res.render('pages/game.ejs')
})

//Animal Easy questions 
app.get('/animals_easy', function (req, res, next) {

})
  .on("error", err => {
    console.log("Something went wrong with displaying the API");
    console.log("Error: " + err.message);
  });


//     })

//   })

// })


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
