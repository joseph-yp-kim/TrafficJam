import React from 'react';

const StreetNumInput = (props) => {
  return (
    <input type='text' name='streetNum' onChange={props.handleInputChange} />
  );
};

export default StreetNumInput;
