import React, { Component } from 'react';
import InputFormContainer from './inputFormContainer';
import DataContainer from './dataContainer';
import ButtonContainer from './buttonContainer';
import RouteContainer from './routeContainer';
import ErrorMessage from './../components/errorMessage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorDisplay: false,
      routeDisplay : false,
      dataDisplay: false, 
      inputInfo : {
        originInput: {},
        destinationInput: {}
      },
      travelInfo : {},
      data : [],
    };
    this.handleOInputChange = this.handleOInputChange.bind(this);
    this.handleDInputChange = this.handleDInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(event) {
    if (event.currentTarget.name === 'getAllData') {
      this.getAllData();
    } else if (!this.state.inputInfo.originInput.streetNum || !this.state.inputInfo.destinationInput.streetNum) {
      this.setState({errorDisplay: true});
    } else if (!this.state.inputInfo.originInput.street || !this.state.inputInfo.destinationInput.street) {
      this.setState({errorDisplay: true});
    } else if (!this.state.inputInfo.originInput.city || !this.state.inputInfo.destinationInput.city) {
      this.setState({errorDisplay: true});
    } else if (!this.state.inputInfo.originInput.state || !this.state.inputInfo.destinationInput.state) {
      this.setState({errorDisplay: true});
    } else {
      if (event.currentTarget.name === 'go') {
        this.googleMapAPI(this.state.inputInfo.originInput, this.state.inputInfo.destinationInput);
      } else if (event.currentTarget.name === 'addRoute') {
        this.addRoute();
      }
    }
  }

  googleMapAPI(origin, destination) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.streetNum}+${origin.street}+${origin.city}+${origin.state}&destination=${destination.streetNum}+${destination.street}+${destination.city}+${destination.state}&departure_time=now&key=AIzaSyAyfCjnOQZeHPfVgw0JEBwDPFxsbVKEzkc`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((resJSON) => {
        console.log(resJSON);
        this.setState({
          errorDisplay : false,
          routeDisplay : true,
          travelInfo : {
            oAddress : resJSON.routes[0].legs[0].start_address,
            dAddress : resJSON.routes[0].legs[0].end_address,
            liveTime : this.strToNum(resJSON.routes[0].legs[0].duration_in_traffic.text),
            normalTime : this.strToNum(resJSON.routes[0].legs[0].duration.text),
            distance : parseInt(resJSON.routes[0].legs[0].distance.text)
          }
        });
        console.log(this.state.travelInfo);
      });
  }

  addRoute() {
    // console.log('adding route to database');
    fetch('/routes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: this.state.travelInfo.oAddress,
        destination: this.state.travelInfo.dAddress,
        liveTime: this.state.travelInfo.liveTime,
        normalTime: this.state.travelInfo.normalTime,
        distance: this.state.travelInfo.distance,
      })
    });
  }

  getAllData() {
    fetch('/routes', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(resJSON => {
      // console.log(resJSON);
      this.setState({
        dataDisplay : true,
        data : resJSON
      })
    });
  }

  strToNum(str) {
    const splitIndx = str.indexOf('r');
    let output;
    if (splitIndx === -1) {
      output = parseInt(str);
    } else {
      const hour = str.slice(0, splitIndx + 2);
      const min = str.slice(splitIndx + 2, str.length);
      output = parseInt(hour) * 60 + parseInt(min);
    }
    return output;
  }

  render() {
    const appDiv = [];
    appDiv.push(<h1 id="title">Traffic Jam</h1>);
    appDiv.push(<InputFormContainer handleOInputChange={this.handleOInputChange} handleDInputChange={this.handleDInputChange} />);
    appDiv.push(<ButtonContainer handleClick={this.handleClick} />);
    if (this.state.errorDisplay === true) {
      appDiv.push(<ErrorMessage />);
    }
    if (this.state.routeDisplay === true) {
      appDiv.push(<RouteContainer travelInfo={this.state.travelInfo} handleClick={this.handleClick} />);
    }
    if (this.state.dataDisplay === true) {
      appDiv.push(<DataContainer data={this.state.data} />);
    }
    return (
      <div>{appDiv}</div>
    );
  }
}

export default App;
