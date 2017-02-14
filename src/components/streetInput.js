import React from 'react';

const StreetInput = (props) => {
  return (
    <input type='text' name='street' onChange={props.handleInputChange} />
  );
};

export default StreetInput;
