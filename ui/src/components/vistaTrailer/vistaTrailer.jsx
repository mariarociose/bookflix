import CommonDisplay from "../CommonDisplay";
import React, { Component } from "react";

import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import "./pdf.css"

//pdfjs.GlobalWorkerOptions.workerSrc = ``;
export default class VistaTRailer extends CommonDisplay {


  renderContent() {

    let url = `http://localhost:9000/http://127.0.0.1/trailers/${this.props.location.state.archivo}`
    return (
      <div className="pdfDisplay">
        <h1>{this.props.location.state.titulo}</h1>
        <div className="pdfElemento" style={{ width: 600 }}>

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
            <div style={{ height: '750px' }}>
              <Viewer fileUrl={url} />
            </div>
          </Worker>

        </div>
      </div>
    );
  }
}