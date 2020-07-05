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

import Libro from "../libroComponent/Libro";
import "./libros.css"

import {Link, Route, Switch} from "react-router-dom";

class Usuarios_fecha extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            usuarios: [],
            mensaje: "",
            granted: true
        }
    }

    componentDidMount(){


      fetch("http://localhost:4000/usuarios_admin",{
          method:"GET",
          headers:{
              "Content-Type": "application/json",
              "access-token": Cookie.get("token").toString()

          }

      })
      .then((res) => (res.json()))
      .then((usuarios) => {
          console.log(usuarios);
          console.log(usuarios.datos);
    //      if(usuarios.datos.length == 0) usuarios.mensaje = "No existen usuarios cargados en el sistema";
          this.setState({usuarios: usuarios,
          mensaje: usuarios.mensaje,granted: true});

      })
      .catch(() => (this.setState({usuarios:[],mensaje: "Acceso denegado",granted: false})))

}

    redirectNew = () => {


                this.props.history.push("/libro_new");

    }
    redirectDetail = () => {

                //Cookie.set("id_libro",libro.id_libro);
                this.props.history.push("/libro_detail");

    }

    renderContent = () => {
            let table = null;
            let titulos = [];
            if(this.state.usuarios != undefined){
                titulos = this.state.usuarios.map((usuario) => (
                        //El map es como el collect de pharo
                        <tr>
                        <td> {usuario.fecha} </td>

                        <td >{usuario.nombre}  </td>
                        <td> {usuario.apellido}  </td>
                        <td> {usuario.email}</td>
                        <td> {usuario.suscripcion} </td>



                        </tr>
                    ))
            };

            if(this.state.usuarios.length != 0){
              table =    <table  class="table table-bordered table-hover" >

                      <thead>

                        <tr>
                        <th> Fecha de Registro </th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Apellido</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Suscripcion</th>


                        </tr>
                        </thead>
                        <tbody>

                        {titulos}

                        </tbody>
                    </table>

                  }
            if(this.state.granted){

                var tabla = (<main>
                                        {table}


                </main>)
              }else tabla = null;

                return(

                  <div>
                      <h1> Usuarios por fecha de registración </h1>
                    <div>
                    <div className="book_form">
                    <form className="create_form" action="" onSubmit={this.handleSubmit}>
                      <fieldset className="create_field">

                        <label>Desde:</label>
                        <input type='date' required name="fecha_desde" id="fecha_desde"/>
                        <label htmlFor="">Hasta:</label>
                        <input type='date' required name="fecha_hasta" id="fecha_hasta"/>


                      </fieldset>


                        <input type="submit" class="saveButton" value="Filtrar"/>




                    </form>

                    </div>
                    </div>


                    <div>


                      <h1> {this.state.mensaje}</h1>

                      {tabla}

                    </div>
                  </div>
                  )

      }
}


export default Usuarios_fecha;
