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
import "./trailers.css"

import {Link, Route, Switch} from "react-router-dom";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class Trailers extends CommonDisplay{

  constructor(props){
      super(props);

      this.state = {
          trailers: [],
          mensaje: "",
          granted : true
      }
  }

  deleteNew = (trailer) => {
      let array = this.state.trailers;
      let index = array.indexOf(trailer);
      array.splice(index,1)
      if(array.length == 0){
          this.setState({trailers: array,mensaje: "No hay trailers disponibles"})
      }else
          this.setState({trailers: array})
  }

  handleConfirm = (trailer) => {
       confirmAlert({
         title: 'Confirme para eliminar',
         message: '¿Esta seguro de que quiere eliminar la trailer?',
         buttons: [
           {
             label: 'Si, estoy seguro',
             onClick: () => this.handleDelete(trailer)
           },
          {
             label: 'No' ,
             onClick: () => this.closeModal
           }
         ]
       });
     }

  handleDelete = (trailer) => {
      let form = new FormData;
      form.append("id", trailer.id_trailer);
      fetch("http://localhost:4000/trailers",{
          method: "DELETE",
          body: form
      })
      .then(() => {
          this.deleteNew(trailer);
      })
      .catch((err) => (console.log(err)))
  }

  componentDidMount(){


          fetch("http://localhost:4000/trailers",{
              method:"GET",
              headers:{
                  "Content-Type": "application/json" //,
                //  "access-token": Cookie.get("token").toString()
              }
          })
          .then((res) => (res.json()))
          .then((trailers) => {
              if(trailers.datos.length == 0){
                  trailers.mensaje = "No hay trailers";

              }

              this.setState({trailers: trailers.datos,
              mensaje: trailers.mensaje,granted: true},() => (console.log(this.state.trailers)));

          })



  }




  renderContent(){
      console.log(this.state.trailers)
          var news = [];
          if(this.state.trailers != undefined){

                  news = this.state.trailers.map((trailer) => (

                      <tr key={trailer.id_trailer}>
                          <td>{trailer.id_trailer}</td>
                          <td>{trailer.titulo}</td>
                          <td>{trailer.descripcion}</td>

                          <td>
                          <input onClick={() => this.handleConfirm(trailer)} className="button" type="button" value="Eliminar"/>
                          </td>

                      </tr>)

              );

          }
      let table = null;
      if(this.state.trailers.length != 0){
          table = ( <table  className="table table-bordered table-hover" >

                      <thead>

                          <tr>
                          <th className="text-center">Id</th>
                          <th className="text-center">Titulo</th>
                          <th className="text-center">Descripcion</th>
                          <th allign ="center"></th>

                          </tr>
                          </thead>
                          <tbody>

                          {news}

                          </tbody>
                      </table>)
      }

      if(this.state.granted){
              var tabla = (

              <main>

                  <div className='Nuevo'>
                      <Link className="button" to="/altaTrailerLibre">Agregar trailer</Link>

                      </div>
                      {table}

              </main>

          )
      }else tabla = null;

          return(
          <div>
              <h1>{this.state.mensaje}</h1>
              {tabla}

          </div>
      )
  }

}


export default Trailers;
