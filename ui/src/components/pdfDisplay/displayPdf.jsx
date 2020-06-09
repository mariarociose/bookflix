import CommonDisplay from "../CommonDisplay";
import React, { Component } from "react";
import { Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default class PDFDisplay extends CommonDisplay {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  renderContent() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file="https://cors-anywhere.herokuapp.com/"
            onLoadSuccess={this.onDocumentLoadSuccess}
            //<iframe src="https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf" width="640" height="480"></iframe>
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
          <iframe src="https://online.flippingbook.com/view/493920" width="1000" height="800"></iframe>
          

        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}