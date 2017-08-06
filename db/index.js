let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ycwl');


let gameSchema = mongoose.Schema({
  winning_number: String,
  wasted_money: Number
});

//creating a model 
//model is a class in which you contruct documents
var Game = mongoose.model('Game', gameSchema);

let save = (model, cb) => {
  let game = new Game();
  game.winning_number = model.winning_number;
  game.wasted_money = model.wasted_money;

  game.save( function (err) {
    if (err) {
      console.error('model NOT saved to db', err)
    } else {
      cb(game);
    }
  });
}

module.exports.save = save;

