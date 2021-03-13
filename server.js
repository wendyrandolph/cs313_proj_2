const express = require('express');
//const session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 5000;
const https = require("https");
const router = require("router");
const bodyParser = require("body-parser");
const request = require("request")
const fs = require('fs');
const { type, userInfo } = require('os');
const { randomBytes } = require('crypto');
//const { Pool } = require("pg");

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
//app.use(session({ secret: 'ssshhhhh' }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.render('index')
});
// app.get('/category', function(req, next){ 
//   var fname = req.query.fname
//   res.render('pages/category', fname)
// })

//Retrieve the data from the web
app.get('/getAPI', function (req, res, next) {

  var fname = req.query.fname
   
  
  https.get('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple', resp => {

    let data = ' ';

    // //A chunk of data has been recieved 
    resp.on("data", chunk => {
      console.log("gather the data string")
      data += chunk;
      //console.log(typeof data);
    });



    //The whole response has been received. Print out the results; 
    resp.on("end", () => {
      console.log("The string is now complete, and ready to be put in an object.")
     
      var result = JSON.parse(data)
   
      let myData = {
        fname: fname, 
        difficulty: result.results[0].difficulty, 
        question: result.results[0].question,
        category: result.results[0].category,
        answer: result.results[0].correct_answer,
        random_sort: result.results[0].incorrect_answers
        
      }
      // end of the myData object variable 


      //Don't move this line of code. 
      console.log(myData);
      res.render('pages/display', { myData })

    })// "end" of response 



      .on("error", err => {
        console.log("Something went wrong with displaying the API");
        console.log("Error: " + err.message);
      })
  })
})


// //Animal Easy questions 
// app.get('/animals_easy', function (req, res, next) {
//   var fname = req.query.fname

//   https.get('https://opentdb.com/api.php?amount=1&category=27&difficulty=easy&type=multiple', resp => {

//     let data = ' ';

//     // //A chunk of data has been recieved 
//     resp.on("data", chunk => {
//       console.log("gather the data string")
//       data += chunk;
//       //console.log(typeof data);
//     });
//   //The whole response has been received. Print out the results; 
//     resp.on("end", () => {
//       console.log("The string is now complete, and ready to be put in an object.")
     
//       var result = JSON.parse(data)
   
//       let myData = {
//         fname: fname, 
//         question: result.results[0].question,
//         category: result.results[0].category,
//         answer: result.results[0].correct_answer,
//         random_sort: result.results[0].incorrect_answers
        
//       }
//       // end of the myData object variable 


//       //Don't move this line of code. 
//       console.log(myData);
//       res.render('pages/display', { myData })

//     })// "end" of response 



//       .on("error", err => {
//         console.log("Something went wrong with displaying the API");
//         console.log("Error: " + err.message);
//       })
//   })
  

//   res.render('pages/display', {myData})
// })


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// function func(a, b){ 
//   return 0.5 - Math.random(); 
// }