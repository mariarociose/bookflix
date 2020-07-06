import React from "react";
import ReactDOM from "react-dom";
import {useHistory} from "react-router-dom"
import "./perfilComponent.css";
import Cookie from "js-cookie";


function Perfil(props){

    let history = useHistory();

    function handleClick() {
        
        Cookie.set("perfilId",props.perfil.id_perfil);
        history.push("/home");

    }

    let callback = React.useCallback(()=> {props.update(props.perfil)},[props.perfil])

    let eraseButton = null;
    if(props.cant > 1) {
        eraseButton = <button onClick={callback} className="profileButton">Eliminar</button>;
    }
    return(

        <div className="perfil">
            <div className="imageContainer" onClick={handleClick}>
                <img src="http://127.0.0.1/avatars/shark.jfif" alt=""/>
            </div>
            
            <p onClick={handleClick}>{props.perfil.nombre}</p>
            <button className="profileButton">Editar</button>
            {eraseButton}
        </div>

    )


}

export default Perfil;