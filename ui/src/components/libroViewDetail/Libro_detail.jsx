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
          autores:[],
          editoriales:[],
          generos:[],
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
            //////////////////////////RECUPERO AUTORES

          if(Cookie.get("token")!= null){
              fetch("http://localhost:4000/autores",{
                  method:"GET",
                  headers:{
                      "Content-Type": "application/json",
                      "access-token": Cookie.get("token").toString()

                  }
              })
              .then((res) => (res.json()))
              .then((autores) => {
                  console.log(autores)
                  console.log(autores.dato)
                  if(autores.length == 0) autores.mensaje = "No hay Autores";
                  this.setState({autores: autores,
                  mensaje: autores.mensaje,granted: true});

              })
              .catch(() => (this.setState({autores:[],mensaje: "Acceso denegado",granted: false})))
          }else this.setState({mensaje: "Acceso denegado"})

            /////////////////////////RECUPERO generos




}


      renderContent(){
        console.log(this.state)

          let autores_select = [];
          console.log(this.state.autores);
          autores_select = this.state.autores.map((autor) => (
                  //El map es como el collect de pharo



                //  if (this.state.libro.id_autor = autor.id_autor){
                //      <option selected key={autor.id_autor} value={autor.id_autor}>  {autor.nombre} {autor.apellido} </option>
                //  }else{
                    <option key={autor.id_autor} value={autor.id_autor}>  {autor.nombre} {autor.apellido} </option>
                  //}

          ))




        return(
          <div>
            <h1>Detalle de Libro</h1>
              <h1>{this.state.libro.titulo}</h1>

              <div className="create_form">

                  <form className="book_form" allign='center' >

                    <fieldset className="create_field">


                      <label for="titulo">Titulo:</label>
                      <input type="text" id="titulo"  required  name="titulo" value= {this.state.libro.titulo}/>


                      <label for="isbn"> Isbn:</label>
                      <input type="text"  required maxLength="13" minLength="13" name="isbn" value= {this.state.libro.isbn}/>

                      <label for="vencimiento">Vencimiento:</label>
                      <input type='date' required name="Fecha_vencimiento" id="Fecha_vencimiento" value= {this.state.libro.fec_vencimiento}/>

                      </fieldset>
                      <fieldset className="create_field">
                      <label for="autor">Autor:</label>
                        <select id="autor" name="autor" >
                        //  <option value="{this.state.libro.id_autor}" selected disabled hidden>Choose here</option>
                          <option selected disabled key={this.state.libro.id_autor} value={this.state.libro.id_autor}>  {this.state.libro.nombre} {this.state.libro.apellido} </option>
                        </select>

                      <label for="autor">Genero:</label>
                      <select id="genero" name="genero">
                      <option selected disabled key={this.state.libro.id_genero} value={this.state.libro.id_genero}>  {this.state.libro.desc_genero} </option>

                      </select>

                      <label for="editorial">Editorial:</label>

                      <select id="editorial" name="editorial">
                      <option selected disabled key={this.state.libro.id_editorial} value={this.state.libro.id_editorial}> {this.state.libro.desc_editorial} </option>
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







          </div>

        )
        }



}
export default Libro_detail;
