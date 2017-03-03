import React from 'react';

const DataTableRow = (props) => {
  // console.log('props:', props);
  return (
    <tr><td>{props.data.__v}</td><td>{props.data.origin}</td><td>{props.data.destination}</td><td>{props.data.distance}</td><td>{props.data.liveTime}</td><td>{props.data.normalTime}</td></tr>
  );
};

export default DataTableRow;