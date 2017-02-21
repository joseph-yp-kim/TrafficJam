import React from 'react';

const DeleteRouteButton = (props) => {
  return (
    <button className="route_button" name="deleteRoute" onClick={props.handleClick} >Delete Route</button>
  );
};

export default DeleteRouteButton;
