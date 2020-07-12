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

import "./comentariosAdmin.css"

import {Link, Route, Switch} from "react-router-dom";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class ComentariosAdmin extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            comentarios: [],
            rowComentarios:[],
            mensaje: "",
            granted: true
        }
    }

    componentDidMount(){

        if(Cookie.get("token")!= null){
            fetch("http://localhost:4000/comentariosAdmin",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "access-token": Cookie.get("token").toString()

                }
            })
            .then((res) => (res.json()))
            .then((comentarios) => {
              console.log(comentarios);
            //    if(comentarios.datos.length == 0) comentarios.mensaje = "No existen comentarios cargados en el sistema";
                this.setState({comentarios: comentarios,
                mensaje: comentarios.mensaje,granted: true});

            })
            console.log(this.state.comentarios)
    }}

    redirect = () => { console.log("prueba")};





    handleValidate = (comentario) => {
         confirmAlert({
           title: 'Confirme nuevo estado de Validación',
           message: '',
           buttons: [
             {
               label: 'Válido',
               onClick: () => this.handleValido(comentario)
             },
             {
               label: 'Contiene Spoilers',
               onClick: () => this.handleSpoiler(comentario)
             },
             {
               label: 'Inapropiado',
               onClick: () => this.handleInvalido(comentario)
             },
            {
               label: 'Cancelar' ,
               onClick: () => this.closeModal
             }
           ]
         });
       }

       reload = () => {
           window.location.reload(false);
           this.props.history.push("/validacionComentarios");
           }

       handleValido = (comentario) => {
           let form = new FormData;
           form.append("id_libro", comentario.id_libro);
           form.append("id_perfil",comentario.id_perfil);
           form.append("status_comentario",'1');
           fetch("http://localhost:4000/validar_comentario",{
               method: "PUT",
               body: form
           })
           .then(() => {
               this.reload();
           })
           .catch((err) => (console.log(err)))
       }

       handleSpoiler = (comentario) => {
           let form = new FormData;
           form.append("id_libro", comentario.id_libro);
           form.append("id_perfil",comentario.id_perfil);
           form.append("status_comentario","2");
           fetch("http://localhost:4000/validar_comentario",{
               method: "PUT",
               body: form
           })
           .then(() => {
               this.reload();
           })
           .catch((err) => (console.log(err)))
       }

       handleInvalido = (comentario) => {
           let form = new FormData;
           form.append("id_libro", comentario.id_libro);
           form.append("id_perfil",comentario.id_perfil);
           form.append("status_comentario",3);
           fetch("http://localhost:4000/validar_comentario",{
               method: "PUT",
               body: form
           })
           .then(() => {
               this.reload();
           })
           .catch((err) => (console.log(err)))
       }

    renderContent = () => {
            let table = null;
            let coments = [];
            if(this.state.comentarios != undefined){
                coments = this.state.comentarios.map((comentario) => (
                        //El map es como el collect de pharo
                        <tr>

                        <td >{comentario.titulo}  </td>
                        <td >{comentario.nombre_usuario}  </td>
                        <td> {comentario.nombre_perfil}  </td>
                        <td> {comentario.comentario}  </td>
                        <td> {comentario.estado_desc}</td>
                        <td>


                        <input onClick={() => this.handleValidate(comentario)} class='button' className="button" type="button" value="Validar"/>

                        </td>



                        </tr>

                    ))
            };

            if(this.state.comentarios.length != 0){
              table =    <table  class="table table-bordered table-hover" >

                      <thead>

                        <tr>
                        <th ></th>
                        <th className="text-center">Usuario</th>
                        <th className="text-center">Perfil</th>
                        <th className="text-center">Comentario</th>
                        <th className="text-center">Estado</th>
                        <th allign ="center"></th>

                        </tr>
                        </thead>
                        <tbody>

                        {coments}

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
                      <h1> Validacion de Comentarios </h1>
                      <h1> {this.state.mensaje}</h1>

                      {tabla}

                    </div>
                  )

      }
}


export default ComentariosAdmin;
