import React from 'react';

const Routes = (props) => {
  return (
    <tr className="route_row" onClick={(e) => {
      e.stopPropagation();
      props.routeSelector(props.route[0], props.route[1], props.index);
    }} ><td>{props.route[0]}</td><td>{props.route[1]}</td></tr>
  );
};

export default Routes;