import React from "react";
import "./novedad.css"
function Novedad(props){

    return(
       <div className="novedad">
            <p>{props.nov.titulo}</p>
            <p>{props.nov.descripcion}</p>
        </div>
    )   
}

export default Novedad;