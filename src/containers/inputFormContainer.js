import React, { Component } from 'react';
import OriginContainer from './originContainer';
import DestinationContainer from './destinationContainer';

class InputFormContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="form_container">
        <OriginContainer handleOInputChange={this.props.handleOInputChange} />
        <DestinationContainer handleDInputChange={this.props.handleDInputChange} />    
      </div>
    );
  }
}

export default InputFormContainer;
