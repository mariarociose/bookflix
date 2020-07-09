import React from "react";
import ReactDOM from "react-dom";
import "./change.css"
import CommonDisplay from "../CommonDisplay";
import {confirmAlert} from "react-confirm-alert";
import Cookie from "js-cookie";

class ChangeSuscription extends CommonDisplay{

    constructor(props){
        super(props);
        this.state = {
            successMessage: "",
            typeSuscription: this.props.match.params.ss == 1 ? "Premium": "Estándar",
            mensaje: this.props.match.params.ss == 0 ? "Cambiate ahora a Premium para obtener hasta 4 perfiles": "",
            botonContenido: this.props.match.params.ss == 1 ? "Cambiar a Estandar": "Cambiar a Premium"
        }
    }

    
    handleClick = (e) => {
        e.preventDefault();
        if(this.props.match.params.ss == 1 && Cookie.get("cantPerfiles")> 2) {
            confirmAlert({
                title: `Tiene más de 2 perfiles`,
                message: 'Para poder cambiar a Estándar debe tener como máximo 2 perfiles',
                buttons: [
                    {label: "OK!",
                        onClick: () => (null)
                    } 
                ]
            })
        }else{
            var newSuscription = "Premium";
            if(Cookie.get("tipo_suscripcion") == 1) {
                newSuscription = "Estandar"
            }
            confirmAlert({
                title: `¿Cambiar suscripcion a ${newSuscription}?`,
                message: 'Confirmar',
                buttons: [
                    {
                        label: 'Si',
                        onClick: () => {
                                let form = new FormData();
                                let tipo;
                                if (this.props.match.params.ss == 1) tipo = 0; else tipo = 1;
                                form.append("tipo",tipo)
                                form.append("userId", Cookie.get("userId"));
                                fetch("http://localhost:4000/changeSuscription",{
                                    method: "PUT",
                                    body: form
                                })
                            .then((res) => (res.json()))
                            .then((res) => {
                                Cookie.set("tipo_suscripcion", res.state)
                                this.setState({successMessage: <p>Se ha cambiado a {newSuscription}</p>,
                                    typeSuscription: this.props.match.params.ss == 0 ? "Premium": "Estándar",
                                    mensaje: this.props.match.params.ss == 1 ? "Cambiate ahora a Premium para obtener hasta 4 perfiles": "",
                                    botonContenido: this.props.match.params.ss == 0 ? "Cambiar a Estandar": "Cambiar a Premium"
                                
                                
                                })
                                          
                                        
                                      
                                        })
                            .catch(() => (this.setState({successMessage: <p>Ha habido un error</p>})))    
                        }} ,
                        {
                            label: 'No',
                            onClick: () => (null)
                        }
                    
                ]
            })

        }
    }



    renderContent(){
        
        return(
            <div className="change-container">
                <div className="change">
                    <p>Suscripcion: {this.state.typeSuscription}</p>
                    {this.state.mensaje}
                    <br/>
                    <button onClick={this.handleClick} className="button">{this.state.botonContenido}</button>
                    {this.state.successMessage}
                </div>
                
            </div>
        )
    }

}

export default ChangeSuscription;