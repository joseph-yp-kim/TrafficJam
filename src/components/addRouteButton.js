import React from 'react';

const AddRouteButton = (props) => {
  return (
    <button className="route_button" name="addRoute" onClick={props.handleClick} >Add Route</button>
  );
};

export default AddRouteButton;
