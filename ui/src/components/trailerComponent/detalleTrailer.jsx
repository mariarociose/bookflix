import React from "react";
import ReactDOM from "react-router-dom";
import CommonDisplay from "../CommonDisplay";

class DetalleTrailer extends CommonDisplay{

    constructor(props){
       super(props);
       console.log(this.props)
       this.state = {
           id: "",
           descripcion: "",
       }
   }




}
   

export default DetalleTrailer;
