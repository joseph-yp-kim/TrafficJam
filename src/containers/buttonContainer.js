import React, { Component } from 'react';
import GoButton from './../components/GoButton';
import GetRouteButton from './../components/getRouteButton';
import GetAllDataButton from './../components/getAllDataButton';
import DeleteRouteButton from './../components/deleteRouteButton';

class ButtonContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="button_container">
        <GoButton />
        <GetRouteButton />
        <GetAllDataButton />
        <DeleteRouteButton />
      </div>
    );
  }
}

export default ButtonContainer;
