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

class Libros extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            libros: [],
            mensaje: "",
            granted: false
        }
    }

    componentDidMount(){

        if(Cookie.get("token")!= null){
            fetch("http://localhost:4000/libros",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "access-token": Cookie.get("token").toString()

                }
            })
            .then((res) => (res.json()))
            .then((libros) => {

                if(libros.datos.length == 0) libros.mensaje = "No existen libros cargados en el sistema";
                this.setState({libros: libros.datos,
                mensaje: libros.mensaje,granted: true});

            })
            .catch(() => (this.setState({libros:[],mensaje: "Acceso denegado",granted: false})))
        }else this.setState({mensaje: "Acceso denegado"})
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
            if(this.state.libros != undefined){
                titulos = this.state.libros.map((libro) => (
                        //El map es como el collect de pharo
                        <tr> <td data-title= 'ISBN' key={libro.id_libro}>{libro.isbn} </td>
                        <td >{libro.titulo}  </td>
                        <td> {libro.nombre} {libro.apellido} </td>
                        <td> {libro.desc_editorial}</td>
                        <td> {libro.desc_genero} </td>
                        <td><Link class='button' rep to={{
                            pathname: `/libro_detail`,
                            state:{
                                id_libro:libro.id_libro
                            }
                        }}>Ver Detalle</Link></td>
                        <td><Link class='button' rep to={{
                            pathname: `/altaCapitulo`,
                            state:{
                                id_libro:libro.id_libro
                            }
                        }}>Agregar Capitulo</Link></td>
                        <td><Link class='button' rep to={{
                            pathname: `/altaTrailer`,
                            state:{
                                id_libro:libro.id_libro
                            }
                        }}>Agregar Trailer</Link></td>

                        </tr>
                    ))
            };

            if(this.state.libros.length != 0){
              table =    <table  class="table table-bordered table-hover" >

                      <thead>

                        <tr>
                        <th >ISBN</th>
                        <th className="text-center">Titulo</th>
                        <th className="text-center">Autor</th>
                        <th className="text-center">Editorial</th>
                        <th className="text-center">Genero</th>
                        <th allign ="center"></th>
                        <th allign ="center"></th>

                        </tr>
                        </thead>
                        <tbody>

                        {titulos}

                        </tbody>
                    </table>

                  }
            if(this.state.granted){

                var tabla = (<main>
                    <div class='Nuevo'>
                        <a  class='button' href='#' onClick={this.redirectNew}>
                        Agregar nuevo libro
                        </a>
                    </div>
                    {table}


                </main>)
              }else tabla = null;

                return(

                    <div>
                      <h1> {this.state.mensaje}</h1>

                      {tabla}

                    </div>
                  )

      }
}


export default Libros;
