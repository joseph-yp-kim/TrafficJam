import React, { Component } from 'react';
import AddRouteButton from './../components/addRouteButton';

class RouteContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="route_container">
        <span>Origin: {this.props.travelInfo.oAddress}</span>
        <span>Destination: {this.props.travelInfo.dAddress}</span>
        <span>Distance: {this.props.travelInfo.distance} mi</span>
        <span>Live travel time: {this.props.travelInfo.liveTime} min</span>
        <span>Normal travel time: {this.props.travelInfo.normalTime} min</span>
        <AddRouteButton handleClick={this.props.handleClick} />
      </div>
    );
  }
}


export default RouteContainer;
