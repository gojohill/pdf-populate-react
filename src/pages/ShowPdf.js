import React, { Component } from 'react';

class ShowPdf extends Component {

  render() {

    if (!this.props.Pdf) return <div></div>

    return (
      <div style={{fontSize: '25px'}}>
        <a href = {this.props.Pdf} target = "_blank">Download Pdf</a>
      </div>
    );
  }
}

export default ShowPdf;