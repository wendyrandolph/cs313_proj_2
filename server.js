
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


const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://postgres:Honey001@localhost:5432/project_2";
const pool = new Pool({
  connectionString: connectionString
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs



var fname;
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json()) // => req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/getAPI', function (req, res, next) {


  res.render('pages/display.ejs')
})
  .on("error", err => {
    console.log("Something went wrong with displaying the API");
    console.log("Error: " + err.message);
  });

app.get('/getCategory', function (req, res, next) {
  res.render('pages/category.ejs')
})

app.get('/end', function (req, res, next) {
  res.render('pages/end.ejs')
})

app.get('/scores', function (req, res, next) {
  res.render('pages/highscore.ejs')
})

app.post('/login', function (req, res, next) {
  var username = req.body.username
  console.log(username + "This is the username entered");
  getUserName(username)


  res.render('pages/game.ejs', params)

})
//Animal Easy questions 
app.get('/animals_easy', function (req, res, next) {
  sess = req.session
  var fname = req.query.fname

  axios.get(
    'https://opentdb.com/api.php?amount=100&category=27&difficulty=easy&type=multiple'
  )
    .then((res) => {
      return JSON.parse();
    })
    .then((loadedQuestions) => {
      questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
          question: loadedQuestion.question,
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
          formattedQuestion['choice' + (index + 1)] = choice;
        });

        return formattedQuestion;
      });
      startGame();
    })
    .catch((err) => {
      console.error(err);
    });
  res.render('pages/display.ejs')
})

  .on("error", err => {
    console.log("Something went wrong with displaying the API");
    console.log("Error: " + err.message);
  });


//     })

//   })

// })


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function checkAnswer() {
  console.log("You are in the checkAnswer function")

}

function getUserName(username, req, res) {

  console.log("Getting username info.");
  console.log("retrieving person with id: ", username);
  getUserFromDb(username, function (error, result) {
    console.log("Back from the database with result: ", result);
  });
  var result = {};
  res.json(result);
}


function getUserFromDb(username, callback) {
  console.log("getPersonFromDb called with id:", username);

  var sql = "SELECT username FROM username WHERE username_id = $1::int";
  var params = [username];
  pool.query(sql, params, function (err, result) {
    if (err) {
      console.log("An error with the database occurred");
      console.log(err);
      callback(err, null);
    }
    console.log("Found DB result:" + JSON.stringify(result));
    callback(null, result);
 
  }) 
}