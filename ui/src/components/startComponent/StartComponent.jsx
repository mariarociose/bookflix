import React from "react";
import CommonDisplay from "../CommonDisplay";
import ReactDOM from "react-dom";
import Libro from "../libroComponent/Libro";
import FalseLibro from "../libroComponent/FalseLibro";
import "../userHome.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import BookFilter from "../bookFilter/bookFilter";
import Favorito from "../libroComponent/Favorito";

class StartComponent extends CommonDisplay{


  constructor(props){
      super(props);

      this.state = {
          news: [],
          mensaje: ""
      }

  }

  componentDidMount(){

      fetch("http://localhost:4000/libros_random")
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


handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("filter",e.target.filter.value);
    fetch("http://localhost:4000/libros_random",{
      method: "POST",
      body: form})
    .then(res => res.json())
    .then((res) => (this.setState({mensaje:res.mensaje,news: res.libros})))
    .catch((res) => (this.setState({mensaje:res.mensaje})))

  }

renderContent(){
    let news = this.state.news.map( (libro) =>

    <div className="create_form">
     <section className="libro">
        <fieldset className="create_field">

      <FalseLibro libro={libro}>


      </FalseLibro>

                  </fieldset>

        </section>
        </div>

    )

      return(
<div>
<h1> Bienvenido a Bookflix </h1>
  <div className="create_field">

      </div>
          <div className="nov-container">

            <h1> {this.state.mensaje}</h1>
              {news}

          </div>
</div>
      )
  }


}

export default StartComponent;
