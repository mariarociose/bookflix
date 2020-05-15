import React from "react";
import ReactDOM from "react-dom";

import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png";


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CommonDisplay from "../CommonDisplay";
import "./libro_create.css"

class Libro_new extends CommonDisplay{

    constructor(props){
        super(props);
        this.state = {
          autores:[],
          editoriales:[],
          generos:[],
          mensaje: "",
          granted : false
        }
    }

    componentDidMount(){

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



        if(Cookie.get("token")
        != null){
            fetch("http://localhost:4000/generos",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "access-token": Cookie.get("token").toString()

                }
            })
            .then((res) => (res.json()))
            .then((generos) => {
                console.log(generos)

                if(generos.length == 0) generos.mensaje = "No hay Generos";
                this.setState({generos: generos,
                mensaje: generos.mensaje,granted: true});

            })
            .catch(() => (this.setState({generos:[],mensaje: "Acceso denegado",granted: false})))
        }else this.setState({mensaje: "Acceso denegado"})


            if(Cookie.get("token")!= null){
            fetch("http://localhost:4000/editoriales",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "access-token": Cookie.get("token").toString()

                }
            })
            .then((res) => (res.json()))
            .then((editoriales) => {
                console.log(editoriales)

                if(editoriales.length == 0) editoriales.mensaje = "No hay Generos";
                this.setState({editoriales: editoriales,
                mensaje: editoriales.mensaje,granted: true});

            })
            .catch(() => (this.setState({editoriales:[],mensaje: "Acceso denegado",granted: false})))
        }else this.setState({mensaje: "Acceso denegado"})
    }

    renderContent = () => {




                  let autores_select = [];
                  console.log(this.state.autores);
                  autores_select = this.state.autores.map((autor) => (
                          //El map es como el collect de pharo
                    <option key={autor.id_autor} value={autor.id_autor}>  {autor.nombre} {autor.apellido} </option>

                  ))

                  let generos_select = [];
                  console.log(this.state.generos);
                  generos_select = this.state.generos.map((genero) => (
                          //El map es como el collect de pharo
                    <option key={genero.id_genero} value={genero.id_genero}>  {genero.desc_genero} </option>

                  ))
                  let editoriales_select = [];
                  console.log(this.state.editoriales);
                  editoriales_select = this.state.editoriales.map((editorial) => (
                          //El map es como el collect de pharo
                    <option key={editorial.id_editorial} value={editorial.id_editorial}>  {editorial.desc_editorial} </option>

                  ))


              return(

              <div>


                <body>

                <div className="create_form">
                      <h1> Alta de libro </h1>
                    <form className="book_form" allign='center' >

                      <fieldset className="create_field">


                        <label for="titulo">Titulo:</label>
                        <input type="text" id="titulo"  required  name="titulo"/>


                        <label for="isbn"> Isbn:</label>
                        <input type="text"  required maxLength="13" minLength="13" name="isbn"/>

                        <label for="vencimiento">Vencimiento:</label>
                        <input type='date' required name="Fecha_vencimiento" id="Fecha_vencimiento"/>

                        </fieldset>
                        <fieldset className="create_field">

                        <label for="autor">Autor:</label>
                          <select id="autor" name="autor">
                            {autores_select}
                          </select>

                        <label for="autor">Genero:</label>
                        <select id="genero" name="genero">
                        {generos_select}

                        </select>

                        <label for="editorial">Editorial:</label>
                        <select id="editorial" name="editorial">
                        {editoriales_select}
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




</body>
</div>
)
}}
export default Libro_new;
