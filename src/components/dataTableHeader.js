import React from 'react';

const DataTableHeader = (props) => {
  return (
    <tr><th>ID</th><th>Origin</th><th>Destination</th><th>Distance (mi)</th><th>Live Travel Time (min)</th><th>Normal Travel Time (min)</th></tr>
  );
};

export default DataTableHeader;