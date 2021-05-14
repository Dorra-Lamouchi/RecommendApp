'use strict';
import React from "react"
import ReactDOM from "react-router-dom"


const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      console.log("You liked this");
    }
    else {
        console.log("not yet");
    }

   
        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
          );

      
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);