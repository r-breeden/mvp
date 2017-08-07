import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { GameResults } from './gameResults.jsx';

console.log(GameResults);

export class App extends React.Component {
  constructor(props) {
    //this is what super(props) is doing this.props = props;
    //among other things
    super(props);
    this.state = {
      textValue:'',
      gameId: location.pathname.split('/')[1] || 'new',
      gameResults: false,
      hasGuessed: false,
      moneyWasted: 0
    }

    //RAB// bind here
    //if you call bind in your render functions it creates a new function everytime
    //bind makes a new function
    this.handleChange = this.handleChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    if (this.state.gameId !== 'new') {
      $.ajax({
        url: '/api/v1/' + this.state.gameId,
        type: 'GET',
      }).then( function(data){
          console.log(data);
         this.setState({
            gameId: data._id.toString(),
            gameResults: data.winner,
            moneyWasted: data.wasted_money
         });
      }.bind(this))   
    }
  }

  handleChange (e) {
    this.setState({textValue: e.target.value});
  }

  submitClick (e) {
      e.preventDefault();
      //if there is a game id present
      $.ajax({
        url: '/api/v1/' + this.state.gameId + '/guess',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({value: this.state.textValue}),
      })
      .then( (data) => {
        //obj{
        // winner: boolean
        // _id: number <-example 
        // wasted_money: number
        //}
        //data = JSON.parse(data);
        console.log(data);
        this.setState({
          gameId: data._id.toString(),
          gameResults: data.winner,
          moneyWasted: data.wasted_money
        });
        //update that they have made a guess
        this.setState( {hasGuessed: true} )

        //add the gameId to the url 
        window.history.replaceState(null, null, url); 
      })
      .catch( (err) => {
        console.log('POST error ', err)
      })  
  }

  render(){
    var title = "You Can't Win The Lottery";
    var moneyWasted = '$4.50';

    var results;
    if ( this.state.hasGuessed ) {
      results = <GameResults result={ this.state.gameResults }/>
    }

    return(
    <div>
      <h1>{ title }</h1>
      <form id='lottoForm'>
        Your Lotto Numbers: <input type='number' value={this.state.textValue} onChange={this.handleChange}/>
        <input type='submit' name='Submit' onClick={ this.submitClick }/>
        <span> Money Wasted: ${ this.state.moneyWasted }</span>
      </form>
      {results}
      <p> condescending remarks </p>
    </div>
    );
  }
};