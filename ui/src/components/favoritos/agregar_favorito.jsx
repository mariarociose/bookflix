import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import Libro from "../libroComponent/Libro";
import Cookie from "js-cookie";
import "../userHome.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import BookFilter from "../bookFilter/bookFilter";
import Favorito from "../libroComponent/Favorito";
class Agregar_favorito extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            news: [],
            mensaje: ""
        }

    }

    componentDidMount(){


      let id_perfil;
      id_perfil= Cookie.get("perfilId");
      id_perfil = JSON.parse(id_perfil);
      console.log(this.props.location.state.id_libro);
      console.log(id_perfil);
      fetch(`http://localhost:4000/marcarFavorito?id_libro=${this.props.location.state.id_libro}&id_perfil=${id_perfil}`,{
        method: "POST",

      })
      .then((res) => (res.json()))
      .then(this.setState({mensaje: "Registrado correctamente"}))


      }

      renderContent(){
        console.log(this.mensaje)
        this.props.history.push("/librosUserView")
      }
}







  export default Agregar_favorito;
