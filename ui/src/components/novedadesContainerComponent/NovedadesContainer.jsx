import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import {Link} from "react-router-dom";
import Cookie from "js-cookie";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class NovedadesContainer extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            novedades: [],
            mensaje: "",
            granted : false
        }
    }

    deleteNew = (novedad) => {
        let array = this.state.novedades;
        let index = array.indexOf(novedad);
        array.splice(index,1)
        if(array.length == 0){
            this.setState({novedades: array,mensaje: "No hay novedades"})
        }else
            this.setState({novedades: array})
    }

    handleConfirm = (novedad) => {
         confirmAlert({
           title: 'Confirme para eliminar',
           message: 'Esta seguro de que quiere eliminar la novedad?',
           buttons: [
             {
               label: 'Si,estoy seguro',
               onClick: () => this.handleDelete(novedad)
             },
        //     {
          //     label: 'No',
            //   onClick: () => this.return()
            // }
           ]
         });
       }




    handleDelete = (novedad) => {
        let form = new FormData;
        form.append("id", novedad.id_novedad);
        fetch("http://localhost:4000/novsAdmin",{
            method: "DELETE",
            body: form
        })
        .then(() => {
            this.deleteNew(novedad);
        })
        .catch((err) => (console.log(err)))
    }

    componentDidMount(){

        if(Cookie.get("token") != null){
            fetch("http://localhost:4000/novsAdmin",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "access-token": Cookie.get("token").toString()

                }
            })
            .then((res) => (res.json()))
            .then((novedades) => {
                if(novedades.datos.length == 0){
                    novedades.mensaje = "No hay novedades";

                }

                this.setState({novedades: novedades.datos,
                mensaje: novedades.mensaje,granted: true},() => (console.log(this.state.novedades)));

            })

            .catch(() => (this.setState({novedades:[],mensaje: "Acceso denegado",granted:false})))
        }else this.setState({mensaje: "Acceso denegado"})
    }




    renderContent(){
        console.log(this.state.novedades)
            var news = [];
            if(this.state.novedades != undefined){

                    news = this.state.novedades.map((novedad) => (

                        <tr key={novedad.id_novedad}>
                            <td>{novedad.titulo}</td>
                            <td>{novedad.descripcion}</td>
                            <td><Link className="button mr-10" rep to={{
                                pathname: `/detalleNovedad`,
                                state:{
                                    id: novedad.id_novedad,
                                    titulo: novedad.titulo,
                                    descripcion: novedad.descripcion
                                }
                            }}>Ver Detalle</Link>
                            <input onClick={() => this.handleConfirm(novedad)} className="button" type="button" value="Eliminar"/>
                            </td>

                        </tr>)

                );

            }
        let table = null;
        if(this.state.novedades.length != 0){
            table = ( <table  className="table table-bordered table-hover" >

                        <thead>

                            <tr>
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
                        <Link className="button" to="/altaNovedad">Agregar Novedad</Link>

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

export default NovedadesContainer;
