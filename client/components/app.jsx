import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

export class App extends React.Component {
  constructor(props) {
    //this is what super(props) is doing this.props = props;
    //among other things
    super(props);
    this.state = {
      textValue:'',
      gameId: location.pathname.split('/')[1],
    }

    //RAB// bind here
    //if you call bind in your render functions it creates a new function everytime
    //bind makes a new function
    this.handleChange = this.handleChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  handleChange (e) {
    this.setState({textValue: e.target.value});
  }

  submitClick (e) {
      e.preventDefault();
      //if there is a game id present
      $.ajax({
        url: '/' + this.state.gameId,
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
        var url =  data._id.toString();
        this.setState({gameId: url});

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

    return(
    <div>
      <h1>{ title }</h1>
      <form id='lottoForm'>
        Your Lotto Numbers: <input type='number' value={this.state.textValue} onChange={this.handleChange}/>
        <input type='submit' name='Submit' onClick={ this.submitClick }/>
        <span> Money Wasted: { moneyWasted }</span>
      </form>
      <p> condescending remarks </p>
    </div>
    );
  }
};