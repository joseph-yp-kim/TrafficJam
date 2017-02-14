import React, { Component } from 'react';
import InputFormContainer from './inputFormContainer';
import DataContainer from './dataContainer';
import ButtonContainer from './buttonContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputInfo : {
        originInput: {},
        destinationInput: {}
      },
    };
    this.handleOInputChange = this.handleOInputChange.bind(this);
    this.handleDInputChange = this.handleDInputChange.bind(this);
  }

  handleOInputChange(event) {
    const update = Object.assign({},this.state.inputInfo);
    update.originInput[event.currentTarget.name] = event.target.value;
    this.setState({
      inputInfo : update
    });
  }

  handleDInputChange(event) {
    const update = Object.assign({},this.state.inputInfo);
    update.destinationInput[event.currentTarget.name] = event.target.value;
    this.setState({
      inputInfo : update
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Traffic Jam</h1>
        <InputFormContainer handleOInputChange={this.handleOInputChange} handleDInputChange={this.handleDInputChange} />
        <ButtonContainer />
        <DataContainer />
      </div>
    );
  }
}

export default App;
