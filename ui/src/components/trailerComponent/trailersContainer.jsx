import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import {Link} from "react-router-dom";
import Cookie from "js-cookie";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class TrailersContainer extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            trailers: [],
            mensaje: "",
            granted : false
        }

    }
    
    componentDidMount(){
        if(Cookie.get("userId") != null){
            fetch("http://localhost:4000/traerTrailers",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "access-token": Cookie.get("token").toString()
                }
            })
            
            .then((res) => (res.json()))
            .then((trailers) => {
                if(trailers.datos.length == 0){
                    trailers.mensaje = "No hay trailers";
                }
                this.setState({trailers: trailers.datos,
                mensaje: trailers.mensaje,granted: true},() => (console.log(this.state.trailers)));
            })
            .catch(() => (this.setState({trailers:[],mensaje: "Acceso denegado",granted:false})))
        }else this.setState({mensaje: "Acceso denegado"})

    }


    renderContent = () => {
        if(this.state.trailers.length !== 0){    
            return(
                <h1>Hay trailers para mostrar pero no se cómo</h1>
            )
        } else 
            return(
                <h1>No hay trailers para mostrar</h1>
            )
}}

export default TrailersContainer;