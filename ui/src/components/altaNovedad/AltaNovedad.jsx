import React from "react";
import ReactDOM from "react-router-dom";
import CommonDisplay from "../CommonDisplay";
//import "./altaNovedad.css"

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
        <div className="book_form">
            <form className="create_form" action="" onSubmit={this.handleSubmit}>
              <fieldset className="create_field">

                <label htmlFor="">Titulo:</label>
                <input required type="text" name="titulo" id="titulo"/>

                <label htmlFor="">Descripción:</label>
                <input required type="text" name="descripcion" id="descripcion"/>
                </fieldset>


                <input type="submit" class="saveButton" value="Agregar Novedad"/>
                <button type="reset" value="Cancelar" class="resetButton">
                Cancelar
                </button>


            </form>

        </div>)
    }

}

export default AltaNovedad;
