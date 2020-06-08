import React from "react";
import "./libro.css"
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
            
            <input type="Button" value="Leer!" class="saveButton" id="cancel" ></input>
              </fieldset>

        </section>
        </div>
    )
}

export default Libro;
