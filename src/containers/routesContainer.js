import React, { Component } from 'react';
import GetRouteButton from './../components/getRouteButton';
import DeleteRouteButton from './../components/deleteRouteButton';
import Routes from './../components/routes';
import SelectedRoute from './../components/selectedRoute';

class RoutesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const routes = [];
    for (let i = 0; i < this.props.routes.length; i += 1) {
      if (this.props.selectedRoute.hasOwnProperty('index') && i === this.props.selectedRoute.index) {
        routes.push(<SelectedRoute key={i} index={i} route={this.props.routes[i]} routeSelector={this.props.routeSelector} />);
      } else {
        routes.push(<Routes key={i} index={i} route={this.props.routes[i]} routeSelector={this.props.routeSelector} />);
      }
    }
    return (
      <div id="routes_container">
        <h3>Routes</h3>
        <div id="routes_scroll">
          <table id="routes_table">
            <thead>
              <tr><th>Origin</th><th>Destination</th></tr>
            </thead>
            <tbody>
              {routes}
            </tbody>
          </table>
        </div>
        <GetRouteButton handleClick={this.props.handleClick} />
        <DeleteRouteButton handleClick={this.props.handleClick} />
      </div>
    );
  }
}


export default RoutesContainer;
