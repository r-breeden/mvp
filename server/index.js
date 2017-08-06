const express = require('express')
const app = express()
const db = require('../db/index.js')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../build'));

app.get('/', function (req,res){
  res.send()
})

app.post('/:_id/', function (req, res){
  console.log('SWEET FUCK');
  res.send(req.params);
})

app.post('/', function (req,res){
  console.log('DISCO');

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
  gamePrep.wasted_money = 0;

  db.save(gamePrep, function (data) {
    console.log(data);
    //check if winner
    var obj = {
      _id: data._id,
      wasted_money: data.wasted_money
    }
    if ( req.body.value === winning_number ){
      obj.winner = true;
      res.send(obj);
    } else {
      obj.winner = false;
      res.send(obj);
    }
  });
  
})

app.listen(3000, function () {
  console.log('server online, listening on port 3000.')
})