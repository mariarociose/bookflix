import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import {Link} from "react-router-dom";
import Novedad from "../novedadComponent/NovedadComponent";
import Libro from "../libroComponent/Libro";
import "../userHome.css"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class LibroContainer extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            news: []
        }

    }

    componentDidMount(){

        fetch("http://localhost:4000/librosUser")
        .then((res) => res.json())
        .then((news) => {
          if(news.length == 0) news.mensaje = "No hay libros disponibles por el momento";
        (this.setState({news: news},() => {

         this.setState({mensaje: this.state.news,
         mensaje: this.state.news.mensaje,granted: true}, console.log(this.state))
       }
     )
   )
} )
}


    renderContent(){
        let news = this.state.news.map((libro) => (
            <Libro libro={libro}></Libro>
        ))
        return(
<div>
<p> aca va el filtro </p>
            <div className="nov-container">

              <h1> {this.state.mensaje}</h1>
                {news}

            </div>
</div>
        )
    }


}

export default LibroContainer;
