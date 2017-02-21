import React from 'react';

const GoButton = (props) => {
  return (
    <button className="route_button" name="go" onClick={props.handleClick} >Go</button>
  );
};

export default GoButton;
