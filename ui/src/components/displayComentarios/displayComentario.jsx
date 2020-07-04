import React from "react";
import ReactDOM from "react-dom";


class DisplayComentario extends React.Component {

    constructor(props){
        super(props);

    }
   

    render(){
        console.log(this.props.comentarios)
        let mensaje = "Comentarios";
        if(this.props.comentarios.length < 1) mensaje = "Sin comentarios para mostrar";
        return(
            <div>
            {mensaje}
            {this.props.comentarios.map((comentario) => (<p>Mensaje: {comentario.comentario}</p>))}
            </div>
        )
    }
    

}

export default DisplayComentario;