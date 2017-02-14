import React from 'react';

const CityInput = (props) => {
  return (
    <input type='text' name='city' onChange={props.handleInputChange} />
  );
};

export default CityInput;
