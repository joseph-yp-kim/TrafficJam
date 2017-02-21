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
        <GoButton handleClick={this.props.handleClick} />
        <GetRouteButton handleClick={this.props.handleClick} />
        <GetAllDataButton handleClick={this.props.handleClick} />
        <DeleteRouteButton handleClick={this.props.handleClick} />
      </div>
    );
  }
}

export default ButtonContainer;
