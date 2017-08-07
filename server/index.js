const express = require('express')
const app = express()
const db = require('../db/index.js')
const bodyParser = require('body-parser');
const path = require('path');

const costOfGuess = 4.5;

let newGame = function (req, res) {
  //Generate Winning Lotto Number
  var winning_number = '';

  var generateRandomNumbers = function (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for ( var i = 0; i < 5; i++){
    var number = generateRandomNumbers(1, 69);
    if( number < 10 ) { 
      number = '0' + number.toString();
    } else {
      number = number.toString();
    }
    winning_number += number;
  }
  winning_number += generateRandomNumbers(1,29).toString();

  //save to db
  let gamePrep = {};
  gamePrep.winning_number = winning_number;
  gamePrep.wasted_money = costOfGuess;

  db.save(gamePrep, function (data) {
    console.log(data);
    //check if winner
    var obj = data.toJSON();
    if ( req.body.value === winning_number ){
      obj.winner = true;
      res.send(obj);
    } else {
      obj.winner = false;
      res.send(obj);
    }
  });

}

let oldGame = function (req, res) {
  // game = db.query(for old game somehow)

  db.Game.findOne({_id: req.params._id }, function (err, game){
    game.wasted_money += costOfGuess;

    game.save(function () {
      console.log(game);
      body = game.toJSON();
      if (req.body.value === game.winning_number){
        body.winner = true;
      } else {
        body.winner = false;
      }
      console.log(body);
      res.send(body);
    })
  });
  // game.moneyWasted += cost of guess
  // res.send(game or some shit)
}

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../build'));

app.get('/', function (req,res){
  res.send()
})

app.get('/:_id/', function (req, res){
  console.log(__dirname + '/../client/index.js');

  res.sendFile(path.resolve(__dirname + '/../build/index.html'));
})

app.get('/api/v1/:_id', function (req, res){
  db.Game.findOne({_id: req.params._id }, function (err, game){
    res.send(game);
  })
})

app.post('/api/v1/:_id/guess', function (req, res){
  if (req.params._id == 'new') {
    newGame(req, res);
  } else {
    oldGame(req, res);
  }
})

app.listen(3000, function () {
  console.log('server online, listening on port 3000.')
})