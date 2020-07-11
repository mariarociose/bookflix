import React from "react";
import "./libro.css"

import {Link, Route, Switch} from "react-router-dom";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function FalseLibro(props){
    let buttonfav;
    let puntuacionProm;
    let puntuacionPerfil;




    console.log(props.libro.Promedio_Puntuacion);
    if(!(props.libro.Promedio_Puntuacion == null)){
            puntuacionProm =    <input type="submit" class="resetButton" value= {props.libro.Promedio_Puntuacion} id="puntuacionprom"></input>
    }else{
            puntuacionProm =
            <input type="submit" class="resetButton" value="Sin calificar" id="puntuacionprom_empty"></input>
          }
;
          if(!(props.libro.esta_puntuado == 0)){
                  puntuacionPerfil =    <input type="submit" class="resetButton" value= {props.libro.esta_puntuado} id="puntuacionprom"></input>
          }else{
                  puntuacionPerfil =
                  <input type="submit" class="resetButton" value="No calificaste este libro!" id="puntuacionprom_empty"></input>
                }




    if(!props.libro.es_fav){
        buttonfav = <Link class='saveButton' rep to={{
                    pathname: `/agregar_favorito`,
                    state:{
                        id_libro:props.libro.id_libro
                    }
                }}> Agregar a Favoritos</Link>


//        <input type="button" class="saveButton" value="Agregar a Favoritos" id="marcar_favorito"></input>
    }else{

        buttonfav = <Link class='saveButton' rep to={{
                    pathname: `/quitar_favorito`,
                    state:{
                        id_libro:props.libro.id_libro
                    }
                }}> Quitar de Favoritos</Link>




          //  <input type="submit" class="resetButton" value="Quitar de Favoritos" id="quitar_favorito"></input>



    }


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
            <p>Puntuacion promedio:   {puntuacionProm} </p>

        <Link class='saveButton' rep to={{
                    pathname: `/loginVisitante`,
                    state:{
                        mensajeFalse:"Inicia Sesión o Registrate para ver más!"
                    }
                }}> Ver mas!</Link>



                  </fieldset>

        </section>
        </div>
    )
}

export default FalseLibro;
