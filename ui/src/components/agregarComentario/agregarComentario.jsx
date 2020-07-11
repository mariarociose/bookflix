import React from "react";
import ReactDOM, { render } from "react-dom";
import "./agregarComentario.css";
import Cookie from "js-cookie";


class NewComment extends React.Component{
      

    constructor(props){
        super(props)
        this.state = {
            mensaje: ""
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        let form = new FormData();
        form.append("idPerfil", Cookie.get("perfilId"))
        form.append("idLibro", this.props.idLibro);
        form.append("puntuacion", e.target.puntuacion.value);
        form.append("comentario", e.target.comentario.value);
        
        let response = await fetch("http://localhost:4000/agregarComentario",{
            method:"Post",
            body: form
        })

        response.json().then((res) => (this.setState({mensaje: res.mensaje})));
    }




    render(){
        return(

            <div className="newCommentContainer">
                <form className="newComment" onSubmit={this.handleSubmit}>
                    <h3>Puntuar y agregar comentario</h3>
                    <label htmlFor="">Su puntuacion:</label>
                    <input required defaultValue="1" type="number" min="1" max="5" name="puntuacion"/>
                    <label htmlFor="">Comentario</label>
                    <textarea name="comentario" id="" cols="30" rows="10" placeholder="Puede dejarnos un comentario opcional acerca de lo que le pareció el libro"></textarea>
                    <input className="button" type="submit" value="Agregar Opinión!"/>
                    {this.state.mensaje}
                </form>
            </div>


        )
    }
}

export default NewComment;