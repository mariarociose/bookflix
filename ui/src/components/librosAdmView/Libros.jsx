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

class Libros extends CommonDisplay{

    constructor(props){
        super(props);
        this.state = {
            libros: [],
            mensaje: ""
        }
    }

    componentDidMount(){


        fetch("http://localhost:4000/libros",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "access-token": Cookie.get("token").toString()

            }
        })
        .then((res) => (res.json()))
        .then((libros) => (this.setState({libros: libros.datos,
            mensaje: libros.mensaje},() => (console.log(this.state)))))
        .catch(() => (this.setState({libros:[],mensaje: "Acceso denegado"})))
    }

    renderContent = () => {


            let titulos = [];
            titulos = this.state.libros.map((libro) => (
                    //El map es como el collect de pharo
                    <tr> <td>{libro.isbn} </td>
                    <td>{libro.titulo}  </td>
                    <td> {libro.nombre} {libro.apellido} </td>
                    <td> {libro.desc_editorial}</td>
                    <td> {libro.desc_genero} </td>

                                            <td  class='select'>
                        <a  class='button' href='#'>
                          Ver detalle
                        </a>
                      </td></tr>
                ));



            return(


                <div>

                  <h1>Listado de libros </h1>

                  <main>

                  <table  class="table table-bordered table-hover" >

                        <thead>

                          <tr>
                          <th data-title>ISBN</th>
                          <th className="text-center">Titulo</th>
                          <th className="text-center">Autor</th>
                          <th className="text-center">Editorial</th>
                          <th className="text-center">Genero</th>
                          <th allign ="center"></th>

                          </tr>
                          </thead>
                          <tbody>

                          {titulos}

                          </tbody>
                      </table>
                      </main>
                </div>

              )

  }
}


export default Libros;
