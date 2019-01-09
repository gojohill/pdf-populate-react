import React, { Component } from "react";
import { Document, Page, setOptions } from 'react-pdf/dist/entry.webpack';
import data from './sample.pdf';


export default class DisplayPDF extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     numPages: null,
  //     pageNumber: 1,
  //   }
  //   this.onDocumentLoad = this.onDocumentLoad.bind(this)
  // }

  state = {
    numPages: 1,
    pageNumber: 1,
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <div>
          <h1>Documentation</h1>
        </div>
        <div id='contentDiv'>
          <Document
            file={data}
            onLoadSuccess={this.onDocumentLoad}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      </div>
    );
  }

}