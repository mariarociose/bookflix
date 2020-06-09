import React from "react";
import "./libro.css"

import {Link, Route, Switch} from "react-router-dom";

function Libro(props){

    return(
      <div className="create_form">
       <section className="libro">
          <fieldset className="create_field">
            <p><h3>{props.libro.titulo}</h3></p>
            <p></p>
            <p> De: {props.libro.nombre} {props.libro.apellido} </p>
            <p></p>
            <p>Publicado Por: {props.libro.desc_editorial}</p>
            <p> Genero:{props.libro.desc_genero} </p>
            <input type="Button" value="Marcar como favorito - Proximamente" class="saveButton" id="cancel" ></input>

      
                <Link class='saveButton' rep to={{
                    pathname: `/libro_detail_user`,
                    state:{
                        id_libro:props.libro.id_libro
                    }
                }}> Ver mas!</Link>



            <p> Ya lei este libro
            <label class="switch">
            <input type="checkbox"value="He leido este libro:"></input>
            <span class="slider"></span>
            </label>
            </p>

          </fieldset>

        </section>
        </div>
    )
}

export default Libro;
