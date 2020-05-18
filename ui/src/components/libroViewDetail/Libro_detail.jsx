import React from "react";
import ReactDOM from "react-dom";

import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png";


import { makeStyles } from '@material-ui/core/styles';


import CommonDisplay from "../CommonDisplay";
import Libro from "../libroComponent/Libro";
import "./libroViewDetail.css";

class Libro_detail extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {

          libro:{},
          autores:[],
          editoriales:[],
          generos:[],
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
                        this.setState({libro:data,isbn:data.isbn,titulo:data.titulo,
                        fec_vencimiento:data.fec_vencimiento,fecha_vencimiento:data.fecha_vencimiento,autor:data.id_autor, editorial:data.id_editorial, genero: data.id_genero, portada_img: data.portada_img},
                        () => (console.log(this.state)))

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
                      <input type="text" id="titulo"  required disabled={!this.state.editing} name="titulo" value= {this.state.titulo} onChange={this.handleChange}/>


                      <label for="isbn"> Isbn:</label>
                      <input type="text"  required maxLength="13" minLength="13" required disabled={!this.state.editing} name="isbn" value= {this.state.isbn} onChange={this.handleChange}/>

                      <label for="vencimiento">Vencimiento:</label>
                      <input type='date' required required disabled={!this.state.editing} name="Fecha_vencimiento" id="Fecha_vencimiento" value= {this.state.fec_vencimiento} onChange={this.handleChange}/>

                      </fieldset>
                      <fieldset className="create_field">
                      <label for="autor">Autor:</label>
                        <select id="autor" name="autor" required disabled={!this.state.editing} >
                        //  <option value="{this.state.libro.id_autor}" selected disabled hidden>Choose here</option>
                          <option selected disabled key={this.state.id_autor} value={this.state.id_autor}>  {this.state.nombre} {this.state.apellido} </option>
                        </select>

                      <label for="autor">Genero:</label>
                      <select id="genero" name="genero" required disabled={!this.state.editing}>
                      <option selected disabled key={this.state.id_genero} value={this.state.id_genero}>  {this.state.desc_genero} </option>

                      </select>

                      <label for="editorial">Editorial:</label>

                      <select id="editorial" name="editorial" required disabled={!this.state.editing}>
                      <option selected disabled key={this.state.id_editorial} value={this.state.id_editorial}> {this.state.desc_editorial} </option>
                      </select>

                      </fieldset>
                      <fieldset className="create_field">
                      <label for="imagen_portada" class="custom-file-upload">
                        Imagen Portada:
                      </label>
                      <input id="imagen_portada" type="file" required disabled={!this.state.editing} />


                      </fieldset>

                      {buttons}


                  </form>








              </div>







          </div>

        )
        }



}
export default Libro_detail;
