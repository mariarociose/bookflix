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
            datos: {}
        }
    }

    getData = (form) => (

        fetch("http://localhost:4000/autores",{
            method: "POST",
            body: new FormData(form)
        })
        .then((res) => (res.json()))
        .then((data) => {
            this.setState({autores:data}, () => (console.log(this.state.datos)))
        })
    )

    getData = (form) => (

        fetch("http://localhost:4000/editoriales",{
            method: "POST",
            body: new FormData(form)
        })
        .then((res) => (res.json()))
        .then((data) => {
            this.setState({editoriales:data}, () => (console.log(this.state.datos)))
        })
    )

    getData = (form) => (

        fetch("http://localhost:4000/generos",{
            method: "POST",
            body: new FormData(form)
        })
        .then((res) => (res.json()))
        .then((data) => {
            this.setState({generos:data}, () => (console.log(this.state.datos)))
        })
    )



    renderContent(){

              return(

              <div>
                <header>
                </header>

                <body>
                <div className="create_form">
                      <h1> Alta de libro </h1>
                    <form allign='center' >

                      <fieldset>


                        <label for="titulo">Titulo:</label>
                        <input type="text" id="titulo"  required  name="titulo"/>


                        <label for="isbn"> Isbn:</label>
                        <input type="text"  required maxLength="13" minLength="13" name="isbn"/>

                        <label for="vencimiento">Vencimiento:</label>
                        <input type='date' required name="Fecha_vencimiento" id="Fecha_vencimiento"/>

                        </fieldset>
                        <fieldset>

                        <label for="autor">Autor:</label>
                          <select id="autor" name="autor">
                            <option value="autor1">Autor1</option>
                            <option value="autor2">Autor2</option>
                          </select>

                        <label for="autor">Genero:</label>
                        <select id="genero" name="genero">
                        <option value="autor1">Autor1</option>
                        <option value="autor2">Autor2</option>
                        </select>
                        <label for="editorial">Editorial:</label>
                        <select id="editorial" name="editorial">
                            <option value="editorial1">editorial1</option>
                            <option value="editorial2">editorial2</option>
                        </select>

                        </fieldset>
                        <fieldset>
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
