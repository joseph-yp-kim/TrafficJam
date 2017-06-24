import React, { Component } from 'react';
import InputFormContainer from './inputFormContainer';
import DataContainer from './dataContainer';
import ButtonContainer from './buttonContainer';
import RouteContainer from './routeContainer';
import RoutesContainer from './routesContainer';
import ErrorMessage from './../components/errorMessage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorDisplay: false,
      routeDisplay : false,
      routesDisplay : false,
      dataDisplay: false,
      inputInfo : {
        originInput: {},
        destinationInput: {}
      },
      selectedRoute : {},
      travelInfo : {},
      routes : [],
      data : [],
    };
    this.handleOInputChange = this.handleOInputChange.bind(this);
    this.handleDInputChange = this.handleDInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.routeSelector = this.routeSelector.bind(this);
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
    } else if (event.currentTarget.name === 'seeRoutes') {
      this.getRoutes();
    } else if (event.currentTarget.name === 'getRouteData') {
      this.getRouteData();
    } else if (event.currentTarget.name === 'deleteRoute') {
      this.deleteRoute();
    } else if (event.currentTarget.name === 'go') {
      this.googleMapAPI(this.state.inputInfo.originInput, this.state.inputInfo.destinationInput);
    } else if (event.currentTarget.name === 'addRoute') {
      this.addRoute();
    }
  }

  googleMapAPI(origin, destination) {
    if (!this.state.inputInfo.originInput.streetNum || !this.state.inputInfo.destinationInput.streetNum) {
      this.setState({errorDisplay: true});
    } else if (!this.state.inputInfo.originInput.street || !this.state.inputInfo.destinationInput.street) {
      this.setState({errorDisplay: true});
    } else if (!this.state.inputInfo.originInput.city || !this.state.inputInfo.destinationInput.city) {
      this.setState({errorDisplay: true});
    } else if (!this.state.inputInfo.originInput.state || !this.state.inputInfo.destinationInput.state) {
      this.setState({errorDisplay: true});
    } else {
      fetch('/directions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.streetNum}+${origin.street}+${origin.city}+${origin.state}&destination=${destination.streetNum}+${destination.street}+${destination.city}+${destination.state}&departure_time=now&key=AIzaSyAyfCjnOQZeHPfVgw0JEBwDPFxsbVKEzkc`
        })
      })
      .then((res) => res.json())
      .then((resJSON) => {
        const data = JSON.parse(resJSON);
        // console.log(resJSON);
        this.setState({
          errorDisplay : false,
          routeDisplay : true,
          travelInfo : {
            oAddress : data.routes[0].legs[0].start_address,
            dAddress : data.routes[0].legs[0].end_address,
            liveTime : this.strToNum(data.routes[0].legs[0].duration_in_traffic.text),
            normalTime : this.strToNum(data.routes[0].legs[0].duration.text),
            distance : parseInt(data.routes[0].legs[0].distance.text)
          }
        });
      });
    }
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

  getRoutes() {
    fetch('/routes', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(resJSON => {
      // console.log(resJSON);
      const routes = [];
      for (let i = 0; i < resJSON.length; i += 1) {
        let count = 0;
        routes.forEach((route) => {
          if (resJSON[i].origin === route[0] && resJSON[i].destination === route[1]) {
            count += 1;
          }
        });
        if (count === 0) routes.push([resJSON[i].origin, resJSON[i].destination])
      }
      // console.log(routes);
      this.setState({
        errorDisplay: false,
        dataDisplay : false,
        routesDisplay: true,
        routeDisplay: false,
        routes: routes,
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
        errorDisplay: false,
        dataDisplay : true,
        routesDisplay: false,
        data : resJSON
      })
    });
  }

  routeSelector(org, dest, index) {
    this.setState({
      selectedRoute: {
        origin: org,
        destination: dest,
        index: index
      }
    })
  }

  getRouteData() {
    console.log('requesting:',this.state.selectedRoute.origin);
    console.log('requesting:',this.state.selectedRoute.destination);
    const url1 = `/route?oAdd=${this.state.selectedRoute.origin}&dAdd=${this.state.selectedRoute.destination}`;
    console.log(url1);
    fetch(url1, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(resJSON => {

      this.setState({
        errorDisplay: false,
        dataDisplay : true,
        routesDisplay: false,
        data : resJSON
      })
    });
  }

  deleteRoute() {
    const url1 = `/route?oAdd=${this.state.selectedRoute.origin}&dAdd=${this.state.selectedRoute.destination}`;
    fetch(url1, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(resJSON => {
      this.getRoutes();
    });
  }

  render() {
    const appDiv = [];
    appDiv.push(<h1 id="title">Traffic Jam</h1>);
    appDiv.push(<InputFormContainer key={0} handleOInputChange={this.handleOInputChange} handleDInputChange={this.handleDInputChange} />);
    appDiv.push(<ButtonContainer handleClick={this.handleClick} />);
    if (this.state.errorDisplay === true) {
      appDiv.push(<ErrorMessage />);
    }
    if (this.state.routeDisplay === true) {
      appDiv.push(<RouteContainer travelInfo={this.state.travelInfo} handleClick={this.handleClick} />);
    }
    if (this.state.routesDisplay === true) {
      appDiv.push(<RoutesContainer routes={this.state.routes} selectedRoute={this.state.selectedRoute} routeSelector={this.routeSelector} handleClick={this.handleClick} />);
    }
    if (this.state.dataDisplay === true) {
      appDiv.push(<DataContainer data={this.state.data} />);
    }
    return (
      <div>{appDiv}</div>
    );
  }

  // ----------------- helper functions -----------------
  
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

  // Helper method to parse the title tag from the response.
  getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
  }

  // -----------------------------------------------------
}

export default App;
