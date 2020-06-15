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
import "./historial_lectura.css"

import {Link, Route, Switch} from "react-router-dom";

class Historial_Lectura extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            libros: [],
            mensaje: "",
            granted: true,
            idperfil:"",
        }
        console.log(this.state)
    }

    componentDidMount(){
            let id_perfil = Cookie.get("perfilId")
            id_perfil = JSON.parse(id_perfil)
            console.log(id_perfil)
            this.setState({idperfil: id_perfil});
            console.log(this.state.idperfil)
            fetch((`http://localhost:4000/historialLectura?idperfil=${id_perfil}`),{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "access-token": Cookie.get("token").toString()

                }
            })
            .then((res) => (res.json()))
            .then((libros) => {

                if(libros.datos.length == 0) libros.mensaje = "No has leido ningun libro aun.";
                this.setState({libros: libros.datos,
                mensaje: libros.mensaje,granted: true});

            })
            .catch(() => (this.setState({libros:[],mensaje: "Acceso denegado",granted: false})))

        console.log(this.state.libros)
    }

    redirectDetail = () => {

                //Cookie.set("id_libro",libro.id_libro);
                this.props.history.push("/libro_detail");

    }

    renderContent = () => {
            console.log(this.state.libros);
            let table = null;
            let titulos = [];
            let leido=['Ya termine este libro' , 'No termine este libro'];
            if(this.state.libros != undefined){
                titulos = this.state.libros.map((libro) => (
                        //El map es como el collect de pharo
                        <tr>
                        <td data-title= 'prueba' key={libro.id_libro}>{libro.fecha_ingreso} </td>

                        <td> {libro.titulo}  </td>
                        <td> {libro.nombre} {libro.apellido} </td>
                        <td> {libro.desc_editorial}</td>
                        <td> {libro.desc_genero} </td>




                        <td><Link class='button' rep to={{
                            pathname: `/libro_detail_user`,
                            state:{
                                id_libro:libro.id_libro
                            }
                        }}>Ver Detalle</Link></td>
                        <td> {libro.Disponible} </td>
                        <td> {libro.terminado} </td>

                        </tr>
                    )
                  )
            }

            console.log(this.state.libros);
            console.log(titulos);
            if(this.state.libros.length != 0){
              table =    <table  class="table table-bordered table-hover" >

                      <thead>

                        <tr>
                        <th >Fecha Acceso</th>
                        <th className="text-center">Titulo</th>
                        <th className="text-center">Autor</th>
                        <th className="text-center">Editorial</th>
                        <th className="text-center">Genero</th>
                        <th allign ="center">   </th>
                        <th allign ="center">Disponibilidad   </th>
                        <th allign ="center">Estado</th>

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

                      <h1> Historial de Lectura</h1>
                      <h3>{this.state.mensaje} </h3>
                      {tabla}

                    </div>
                  )

      }
}


export default Historial_Lectura;
