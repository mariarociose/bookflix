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





class Libros extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            datos: []
        }
    }


    getData = (form) => (

        fetch("http://localhost:4000/libros",{
            method: "POST",
            body: new FormData(form)
        })
        .then((res) => (res.json()))
        .then((data) => {
            this.setState({datos:data}, () => (console.log(this.state.datos)))
        })
    )

          render(){

                    return(

                      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Titulo</th>
            <th className="text-center">Editorial</th>
            <th className="text-center">Autor</th>
            <th className="text-center">Genero</th>
          </tr>
        </thead>
        <tbody>
        

        </tbody>
        </table>
    )
}}


export default Libros;
