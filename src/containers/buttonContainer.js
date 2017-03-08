import React, { Component } from 'react';
import GoButton from './../components/GoButton';
import SeeRoutesButton from './../components/seeRoutesButton';
import GetAllDataButton from './../components/getAllDataButton';

class ButtonContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="button_container">
        <GoButton handleClick={this.props.handleClick} />
        <SeeRoutesButton handleClick={this.props.handleClick} />
        <GetAllDataButton handleClick={this.props.handleClick} />
      </div>
    );
  }
}

export default ButtonContainer;
