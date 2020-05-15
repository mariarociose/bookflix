import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import Novedad from "../novedadComponent/NovedadComponent";
import "./novedadesContainer.css";
import Cookie from "js-cookie";

class NovedadesContainer extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            novedades: [],
            mensaje: ""
        }
    }

    componentDidMount(){
        
        
        
        fetch("http://localhost:4000/novsAdmin",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "access-token": Cookie.get("token").toString()
                
            }
        })
        .then((res) => (res.json()))
        .then((novedades) => (this.setState({novedades: novedades.datos,
            mensaje: novedades.mensaje},() => (console.log(this.state)))))
        .catch(() => (this.setState({novedades:[],mensaje: "Acceso denegado"})))  
    }

    renderContent = () => {
        
        let news = [];
        if(this.state.novedades != undefined){
                news = this.state.novedades.map((novedad) => (
                //El map es como el collect de pharo
                <Novedad new={novedad}></Novedad>
            ));
        }
        return(
            <div>
                <h1>{this.state.mensaje}</h1>
                <div className="container-news">
                    
                    {news}
                </div>
            </div>
        )
    }


}

export default NovedadesContainer;