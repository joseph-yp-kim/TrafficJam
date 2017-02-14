import React, { Component } from 'react';
import StreetNumInput from './../components/streetNumInput.js';
import StreetInput from './../components/streetInput.js';
import CityInput from './../components/cityInput.js';
import StateInput from './../components/stateInput.js';

class DestinationContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="OD_container">
        <span className="form_title">Destination</span>
        <span className="input_line">Street #: <StreetNumInput handleInputChange={this.props.handleDInputChange} /></span>
        <span className="input_line">Street: <StreetInput handleInputChange={this.props.handleDInputChange} /></span>
        <span className="input_line">City: <CityInput handleInputChange={this.props.handleDInputChange} /></span>
        <span className="input_line">State: <StateInput handleInputChange={this.props.handleDInputChange} /></span>
      </div>
    );
  }
}

export default DestinationContainer;
