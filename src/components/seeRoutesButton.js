import React from 'react';

const SeeRoutesButton = (props) => {
  return (
    <button className="route_button" name="seeRoutes"  onClick={props.handleClick} >See Routes</button>
  );
};

export default SeeRoutesButton;
