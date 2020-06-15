import CommonDisplay from "../CommonDisplay";
import React, { Component } from "react";

import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';


//pdfjs.GlobalWorkerOptions.workerSrc = ``;
export default class PDFDisplay extends CommonDisplay {


  renderContent() {

    return (
      <div>
        <div style={{ width: 600 }}>

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
            <div style={{ height: '750px' }}>
              <Viewer fileUrl="http://localhost:9000/http://127.0.0.1/capitulos/sample.pdf" />
            </div>
          </Worker>

        </div>
      </div>
    );
  }
}
