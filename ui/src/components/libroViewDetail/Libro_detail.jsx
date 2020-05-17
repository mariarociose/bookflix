import React from "react";
import ReactDOM from "react-dom";

import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png";


import { makeStyles } from '@material-ui/core/styles';


import CommonDisplay from "../CommonDisplay";
import Libro from "../libroComponent/Libro";

class Libro_detail extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
          id_libro: "",
          libro:{},
          mensaje: "",
          header : ""
        }
    }

    componentDidMount(){

          if(Cookie.get("userId")!= null){

                let id_libro = this.props.location.state.id_libro
                id_libro = JSON.parse(id_libro)
                this.setState({id_libro:id_libro})

                console.log(id_libro)
                fetch((`http://localhost:4000/libro_by_id?id_libro=${id_libro}`),{
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json",
                        "access-token": Cookie.get("token").toString()
                        }
                    })
                    .then((res) => (res.json()))
                    .then((data) => {
                        console.log(data)
                        this.setState({libro:data}, () => (console.log(this.state)))

                })
              }
          else
          this.props.history.push("/homeAdmin");


}


      renderContent(){
        console.log(this.state)


        return(
          <div>
            <p>Detalle de Libro</p>
              <h1>Novedad: {this.state.libro.apellido}</h1>

              <div className="create_form">
                    <h1> Detalle de libro </h1>
                  <form className="book_form" allign='center' >

                    <fieldset className="create_field">


                      <label for="titulo">Titulo:</label>
                      <input type="text" id="titulo"  required  name="titulo" value= {this.state.libro.titulo}/>


                      <label for="isbn"> Isbn:</label>
                      <input type="text"  required maxLength="13" minLength="13" name="isbn" value= {this.state.libro.isbn}/>

                      <label for="vencimiento">Vencimiento:</label>
                      <input type='date' required name="Fecha_vencimiento" id="Fecha_vencimiento" value= {this.state.libro.fecha_vencimiento}/>

                      </fieldset>
                      <fieldset className="create_field">

                      <label for="autor">Autor:</label>
                        <select id="autor" name="autor">

                        </select>

                      <label for="autor">Genero:</label>
                      <select id="genero" name="genero">


                      </select>

                      <label for="editorial">Editorial:</label>
                      <select id="editorial" name="editorial">

                      </select>

                      </fieldset>
                      <fieldset className="create_field">
                      <label for="imagen_portada" class="custom-file-upload">
                        Imagen Portada:
                      </label>
                      <input id="imagen_portada" type="file"/>


                      </fieldset>



                      <button type="submit" value="Guardar" class="saveButton">
                      Guardar
                      </button>
                      <button type="reset" value="Cancelar" class="resetButton">
                      Cancelar
                      </button>


                  </form>








              </div>





)
}}

          </div>

        )
        }



}
export default Libro_detail;
