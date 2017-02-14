import React from 'react';

const StateInput = (props) => {
  return (
    <input type='text' name='state' onChange={props.handleInputChange} />
  );
};

export default StateInput;
