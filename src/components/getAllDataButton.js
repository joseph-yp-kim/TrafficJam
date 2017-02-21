import React from 'react';

const GetAllDataButton = (props) => {
  return (
    <button className="route_button" name="getAllData" onClick={props.handleClick} >Get All Data</button>
  );
};

export default GetAllDataButton;
