import React, { Component } from 'react';
import GetRouteButton from './../components/getRouteButton';
import DeleteRouteButton from './../components/deleteRouteButton';
import Routes from './../components/routes';

class RoutesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const routes = [];
    for (let i = 0; i < this.props.routes.length; i += 1) {
      routes.push(<Routes route={this.props.routes[i]} />);
    }
    return (
      <div id="routes_container">
        <h3>Routes</h3>
        <div id="routes_scroll">
          <table id="routes_table">
            <tbody>
              {routes}
            </tbody>
          </table>
        </div>
        <GetRouteButton />
        <DeleteRouteButton />
      </div>
    );
  }
}


export default RoutesContainer;
