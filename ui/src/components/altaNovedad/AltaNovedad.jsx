import React from "react";
import ReactDOM from "react-router-dom";
import CommonDisplay from "../CommonDisplay";
import "./altaNovedad.css"

class AltaNovedad extends CommonDisplay{
    
    constructor(props){
        super(props);
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/novsAdmin",{
            method: "POST",
            body : new FormData(e.target)
        }).then(() => (this.props.history.push("/novedadesAdmin")))
        .catch((err) => (console.log(err)))
    }
    
    renderContent(){
        return(
        <div className="altaNovedadContainer">
            <form action="" onSubmit={this.handleSubmit}>
                <label htmlFor="">Titulo:</label>
                <input required type="text" name="titulo" id=""/>
                <label htmlFor="">Descripción:</label>
                <input required type="text" name="descripcion" id=""/>
                <input type="submit" value="Agregar Novedad"/>
            </form>

        </div>)
    }

}

export default AltaNovedad;