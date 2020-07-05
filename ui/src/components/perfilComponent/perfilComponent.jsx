import React from "react";
import ReactDOM from "react-dom";
import {useHistory} from "react-router-dom"
import "./perfilComponent.css";
import Cookie from "js-cookie";


function Perfil(props){

    let history = useHistory();

    function handleClick() {
        
        Cookie.set("perfil_Id",props.perfil.id_perfil);
        history.push("/home");

    }
    return(

        <div className="perfil">
            <div className="imageContainer" onClick={handleClick}>
                <img src="http://127.0.0.1/avatars/shark.jfif" alt=""/>
            </div>
            
            <p onClick={handleClick}>{props.perfil.nombre}</p>
            <button className="profileButton">Editar</button>
            <button className="profileButton">Eliminar</button>
        </div>

    )


}

export default Perfil;