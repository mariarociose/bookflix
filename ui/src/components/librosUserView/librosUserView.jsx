import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import Libro from "../libroComponent/Libro";
import "../userHome.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import BookFilter from "../bookFilter/bookFilter";
import Favorito from "../libroComponent/Favorito";
import Cookie from "js-cookie";
class LibroContainer extends CommonDisplay{

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
        fetch(`http://localhost:4000/librosUser?id_perfil=${id_perfil}`)
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
      fetch("http://localhost:4000/librosUser",{
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

        <Libro libro={libro}>


        </Libro>

                    </fieldset>

          </section>
          </div>

      )

        return(
<div>
    <div className="create_field">
      <fieldset>
          <form action="" onSubmit={this.handleSubmit}>
              <input name="filter" id="filter" type="text" class placeholder="Nombre, genero, autor, editorial, ..."/>
              <input type="submit"value="Buscar" class="updateButton"/>
            </form>

            </fieldset>
        </div>
            <div className="nov-container">

              <h1> {this.state.mensaje}</h1>
                {news}

            </div>
</div>
        )
    }


}

export default LibroContainer;
