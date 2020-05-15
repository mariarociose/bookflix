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
                <div className="loginbox">
                      <h1> Alta de libro </h1>
                    <form allign='center' >
                        <p><label > Titulo * </label>
                        <input allign='center' required  name="titulo"/>

                        </p>
                        <br/>
                        <p>
                        <label> Isbn * </label>
                        <input allign='center' required maxLength="13" minLength="13" name="isbn"/>
                        </p>
                        <br/>
                        <p>
                        <label>Vencimiento * </label>
                        <input type='date' required name="Fecha_vencimiento" id="Fecha_vencimiento"/>
                        </p>
                        <br/>

                        <p>Autor *
                          <select>
                            <option value="autor1">Autor1</option>
                            <option value="autor2">Autor2</option>
                          </select>

                        </p>
                        <br/>

                        <p>Genero *
                        <select>

                        </select>
                        </p>
                        <br/>
                        <p>Editorial *
                        <select>
                            <option value="editorial1">editorial1</option>
                            <option value="editorial2">editorial2</option>
                        </select>
                        </p>
                        <br/>
                        <p> Imagen
                        <input type='file'/>

                        </p>
                        <br/>
                        <input type="reset" value="Cancelar"/>
                        <input type="submit" value="Guardar"/>

                        <br/>
                    </form>
                </div>



</body>
</div>
)
}}
export default Libro_new;
