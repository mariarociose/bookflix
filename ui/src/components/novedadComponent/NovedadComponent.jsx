import React from "react";
import "./novedad.css"
function Novedad(props){

    return(
       <div className="novedad">
            <p>{props.new.titulo}</p>
            <p>{props.new.descripcion}</p>
        </div>
    )   
}

export default Novedad;