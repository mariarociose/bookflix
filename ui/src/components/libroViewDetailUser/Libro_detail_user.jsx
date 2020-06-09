import React from "react";
import ReactDOM from "react-dom";

import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png";


import { makeStyles } from '@material-ui/core/styles';


import CommonDisplay from "../CommonDisplay";
import Libro from "../libroComponent/Libro";
import "./libroDetailUser.css";
import {Link, Route, Switch} from "react-router-dom";

class Libro_detail_user extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {

          libro:{},
          autores:[],
          editoriales:[],
          generos:[],
          capitulos:[],
          mensaje: "",
          header : "",
          id_libro: "",
          isbn:"",
          titulo:"",
          fecha_vencimiento:"",
          autor:"",
          editorial:"",
          genero:"",
          id_autor:"",
          id_editorial:"",
          id_genero:"",
          portada_img:"",
          fec_vencimiento:"",
          desc_editorial:"",
          desc_genero:"",
          nombre_autor:"",
          apellido_autor:"",
          editing: false
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
                        this.setState({apellido_autor:data.apellido,nombre_autor:data.nombre,desc_genero:data.desc_genero,desc_editorial:data.desc_editorial,libro:data,isbn:data.isbn,titulo:data.titulo,
                        fec_vencimiento:data.fec_vencimiento,fecha_vencimiento:data.fecha_vencimiento,autor:data.id_autor, editorial:data.id_editorial, genero: data.id_genero, portada_img: data.portada_img},
                        () => (console.log(this.state)))

                })
              }
          else
          this.props.history.push("/homeAdmin");
            //////////////////////////RECUPERO AUTORES

          if(Cookie.get("token")!= null){
              fetch("http://localhost:4000/autores")
              .then((res) => (res.json()))
              .then((autores) => {
                  console.log(autores)
                  console.log(autores.dato)
                  if(autores.length == 0) autores.mensaje = "No hay Autores";
                  this.setState({autores: autores,
                  mensaje: autores.mensaje,granted: true}, console.log(this.state));

              })
              .catch(() => (this.setState({autores:[],mensaje: "Acceso denegado",granted: false})))
          }else this.setState({mensaje: "Acceso denegado"})

            /////////////////////////RECUPERO generos
          fetch("http://localhost:4000/generos")
          .then((res) => res.json())
          .then((generos) => {
            if(generos.length == 0) generos.mensaje = "No hay generos";
                  this.setState({generos: generos,
                  mensaje: generos.mensaje,granted: true}, console.log(this.state));
            })
          fetch("http://localhost:4000/editoriales")
          .then((res) => res.json())
         .then((editoriales) => {
          if(editoriales.length == 0) editoriales.mensaje = "No hay editoriales";
          this.setState({editoriales: editoriales,
          mensaje: editoriales.mensaje,granted: true}, console.log(this.state));
          })


          //trae capitulos de idlibro
          fetch((`http://localhost:4000/capitulosDeLibro?id_libro=${this.props.location.state.id_libro}`),{
              method:"GET",
              headers:{
                  "Content-Type": "application/json",
                  "access-token": Cookie.get("token").toString()
                  }
              })
          .then((res) => res.json())
         .then((capitulos) => {
          if(capitulos.length == 0) capitulos.mensaje = "No hay capitulos para este libro";
          this.setState({capitulos: capitulos,
          mensaje: capitulos.mensaje,granted: true}, console.log(this.state));
          })


         }




handleSubmit = (e) => {

  let formData = new FormData(e.target);
  formData.append("id",this.state.id_libro)

  e.preventDefault();
  fetch("http://localhost:4000/libroUpdate",{
    method: "PUT",
    body: formData
  })
  .then((res) => (res.json()))
  .then(this.setState({mensaje: "Libro actualizado correctamente"}))
}



handleChange = (e) => (
    this.setState({[e.target.name]: e.target.value},()=>(console.log(this.state)))
)


handleClick = (e) => {
   this.setState({editing: !this.state.editing})
}

      renderContent(){
        console.log(this.state)

        let buttons;

        if(!this.state.editing){
            buttons = <input type="button" value="Actualizar" id="updateButton"  class="updateButton" onClick={this.handleClick}></input>
        }else{
            buttons = (
            <div>
                <input type="submit" value="Aceptar" id="saveButton" class="saveButton"></input>
                <input type="button" value="Cancelar" id="resetButton" class="resetButton" onClick={this.handleClick}></input>
            </div>
            )
        }

        // Listado de Capitulos de libro.

        let tableCapitulos = null;
        let capitulos = [];

        if(this.state.capitulos != undefined){
            capitulos = this.state.capitulos.map((capitulo) => (
                    //El map es como el collect de pharo
                    <tr>
                    <td data-title= 'id_capitulo' key={capitulo.id_capitulo}> {capitulo.numero_capitulo}</td>

                    <td >{capitulo.titulo}  </td>
                    <td> {capitulo.descripcion}  </td>
                    <td><Link class='button' rep to={{
                        pathname: `/libro_detail`,  //PONER PATH A LEER CAPITULO!!!!
                        state:{
                            id_libro:capitulo.id_capitulo
                        }
                    }}>Leer Capitulo</Link></td>

                    </tr>
                ))
        };

        if(this.state.capitulos.length != 0){
          tableCapitulos =    <table  class="table table-bordered table-hover" >

                  <thead>

                    <tr>

                    <th className="text-center">Nro Capitulo</th>
                    <th className="text-center">Titulo</th>
                    <th className="text-center">Descripcion</th>
                    <th className="text-center"></th>


                    </tr>
                    </thead>
                    <tbody>

                    {capitulos}

                    </tbody>
                </table>





              }



            return(
          <div>


            <main>
              <h1>{this.state.libro.titulo}</h1>

              <div className="create_form">

                  <form className="book_form" allign='center' onSubmit={this.handleSubmit}>

                    <fieldset className="create_field">


                      <label for="titulo">{this.state.titulo}</label>

                    </fieldset>
                      <fieldset className="create_field">
                      <label for="autor">Autor: {this.state.nombre_autor} {this.state.apellido_autor}</label>


                      <label for="autor">Genero: {this.state.desc_genero}</label>
                      <label for="editorial">Editorial: {this.state.desc_editorial}</label>

                      </fieldset>
                      <fieldset className="create_field">

                      <p> Ya lei este libro
                      <label class="switch">
                      <input type="checkbox"value="He leido este libro:"></input>
                      <span class="slider"></span>
                      </label>
                      </p>

                      </fieldset>



                  </form>
                    <h3> Capitulos </h3>

                    <fieldset>
                      <h1> {this.state.mensaje}</h1>

                      <div>
                      {tableCapitulos}
                      </div>












                    </fieldset>




              </div>



                                </main>




          </div>

        )
        }



}
export default Libro_detail_user;
