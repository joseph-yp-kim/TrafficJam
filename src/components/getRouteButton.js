import React from 'react';

const GetRouteButton = (props) => {
  return (
    <button className="route_button" name="getRouteData"  onClick={props.handleClick} >Get Route Data</button>
  );
};

export default GetRouteButton;
