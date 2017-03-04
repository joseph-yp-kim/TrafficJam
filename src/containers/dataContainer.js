import React, { Component } from 'react';
import DataTableHeader from './../components/dataTableHeader.js';
import DataTableRow from './../components/dataTableRow.js';

class DataContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataRows = [];
    for (let i = 0; i < this.props.data.length; i += 1) {
      dataRows.push(<DataTableRow data={this.props.data[i]} />)
    }
    return (
      <div id="data_container">
        <table id="data_table">
          <thead>
            <DataTableHeader />
          </thead>
          <tbody>
            {dataRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataContainer;
