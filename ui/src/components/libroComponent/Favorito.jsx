import React from "react";
import "./libro.css";

import {Link, Route, Switch} from "react-router-dom";

function Favorito(props){

let result;
let mensaje;

//result = fetch("http://localhost:4000/librosUser")
//.then((res) => res.json())
//.then(res) => result =
//console.log(result);





console.log(props)
let buttons;

buttons = <input type="button" class="saveButton" value="Actualizar" id="update" ></input>





    return(
      <div className="create_form">
       <section className="libro">
          <fieldset className="create_field">

            <input type="Button" value="Marcar como favorito - Proximamente" class="saveButton" id="cancel" ></input>
            {buttons}
                  </fieldset>

        </section>
        </div>
    )
}



export default Favorito;
