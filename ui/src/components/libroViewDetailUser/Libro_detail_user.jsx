import React from "react";
import ReactDOM from "react-dom";

import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png";


import { makeStyles } from '@material-ui/core/styles';


import CommonDisplay from "../CommonDisplay";
import Libro from "../libroComponent/Libro";
import "./libroDetailUser.css";
import {Link, Route, Switch} from "react-router-dom";

import DisplayComentario from "../displayComentarios/displayComentario";

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
          editing: false,
          leido:"",
          leidobutton:"true",
          idperfil:"1",
          comentarios: []
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


        //chequeo si el libro esta leido o // NOTE:
        let id_perfil;
        id_perfil= Cookie.get("perfilId");
        id_perfil = JSON.parse(id_perfil);
        console.log(id_perfil);


        console.log(id_perfil);
        fetch((`http://localhost:4000/marcarLeido?id_libro=${id_perfil}`),{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "access-token": Cookie.get("token").toString()
                }
            })
        .then((res) => res.json())
       .then((leido) => {
        if(leido.length == 0) leido.mensaje = "No hay marca de leido";
        this.setState({leido: leido,
        mensaje: leido.mensaje,granted: true}, console.log(this.state));
        })

        fetch(`http://localhost:4000/getComentarios?id_libro=${this.props.location.state.id_libro}`)
        .then((res) => (res.json()))
        .then((res) => this.setState({comentarios: res.comentarios},()=> (console.log(this.state.comentarios))))
        .catch((err) => (console.log(err))) 



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


//registro de visita a un libro cuando se accede al capitulo.
handleVerCapitulo = (e) => {

let id_perfil = Cookie.get("perfilId")
id_perfil = JSON.parse(id_perfil)
console.log(id_perfil)
this.setState({idperfil: id_perfil});
console.log(this.state.idperfil)



fetch(`http://localhost:4000/registroVisita?id_libro=${this.state.libro.id_libro}&id_perfil=${id_perfil}`,{
  method: "POST",

})
.then((res) => (res.json()))
.then(this.setState({mensaje: "Regitrado correctamente"}))


}

handleLeido = (e) => {
  e.preventDefault();
  let id_perfil = Cookie.get("perfilId")
  id_perfil = JSON.parse(id_perfil)
  console.log(id_perfil)
  this.setState({idperfil: id_perfil});
  console.log(this.state.idperfil)
  this.setState({leidobutton: !this.state.leidobutton})


  fetch(`http://localhost:4000/marcarLeido?id_libro=${this.state.libro.id_libro}&id_perfil=${id_perfil}`,{
    method: "POST",

  })
  .then((res) => (res.json()))
  .then(this.setState({mensaje: "Se registro que finalizo su libro."}))
}


      renderContent(){
        console.log(this.state)

        let buttons;
        let leidobut;

        console.log(this.state.leidobutton)
        if(this.state.leidobutton){
          leidobut =   <div> <input type="button" value="Ya lei este libro!" id="resetButton"  class="resetButton" onClick={this.handleLeido}></input> </div>
        }else
        {
         leidobut = <div>  <input type="button" value="Ya terminaste de leer este libro!" id="updateButton"  class="updateButton"  ></input> </div>
        }

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
                    <td><Link class='button' onClick={this.handleVerCapitulo} rep to={{
                        pathname: `/capituloVista`,  //PONER PATH A LEER CAPITULO!!!!
                        state:{
                            id_libro:capitulo.id_capitulo,
                            id_perfil:this.state.id_perfil,
                            archivo: capitulo.archivo,
                            titulo: capitulo.titulo
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



                      <input type="button" value="Ya lei este libro!" id="updateButton"  class="updateButton" onClick={this.handleLeido}></input>

                      </fieldset>



                  </form>
                    <h3> Capitulos </h3>

                    <fieldset>
                      <h1> {this.state.mensaje}</h1>

                      <div>
                      {tableCapitulos}
                      </div>












                    </fieldset>



                    <DisplayComentario comentarios={this.state.comentarios}></DisplayComentario>
              </div>



                                </main>



                                
          </div>
          
          
          </div>
        )
        }



}
export default Libro_detail_user;
