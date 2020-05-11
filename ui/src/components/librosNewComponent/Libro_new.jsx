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


class Libro_new extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            datos: {}
        }
    }


    render(){

              return(


                <div className="loginbox">
                      <h1> Alta de libro </h1>
                    <form >
                        <p><label > Titulo * </label></p>
                        <input required  name="titulo"/>


                        <p>
                        <label> Isbn * </label>
                        <input required  name="isbn"/>
                        </p>

                        <p>
                        <label>Vencimiento * </label>
                        <input required name="Fecha_vencimiento" id="Fecha_vencimiento"/>
                        </p>

                        <p>Autor *
                          <select>
                            <option value="autor1">Autor1</option>
                            <option value="autor2">Autor2</option>
                          </select>

                        </p>
                        <p>Genero * </p>
                        <select>
                            <option value="genero1">Genero1</option>
                            <option value="genero2">Genero2</option>
                        </select>
                        <p>Editorial * </p>
                        <select>
                            <option value="editorial1">editorial1</option>
                            <option value="editorial2">editorial2</option>
                        </select>
                        <p> Imagen </p>

                        <input type="submit" value="Guardar"/>
                        <input type="Cancel" value="Cancelar"/>
                    </form>
                </div>



)
}}
export default Libro_new;
