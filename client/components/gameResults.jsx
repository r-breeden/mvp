import React from 'react';
import ReactDOM from 'react-dom';

export class GameResults extends React.Component{
  render(){
    if( this.props.result === true) {
      return (
      <span>
        You won, but you wasted your good luck on this app. Way to go. 
      </span>
      );
    } else {
      return(
        <span>
          You lost. Who'd a thunk it. 
        </span>
      );
    }
  }
}

