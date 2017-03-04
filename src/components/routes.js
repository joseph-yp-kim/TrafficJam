import React from 'react';

const Routes = (props) => {
  const style = {
    'font-style': 'italic'
  };
  return (
    <tr><td><span style={style}>{props.route[0]}</span> => <span style={style}>{props.route[1]}</span></td></tr>
  );
};

export default Routes;