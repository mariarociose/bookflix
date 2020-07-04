import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import {Link} from "react-router-dom";
import Cookie from "js-cookie";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class TrailersContainer extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            trailers: [],
            mensaje: "No hay trailers",
            granted : false
        }

    }
    
    componentDidMount(){
            fetch("http://localhost:4000/traerTrailers")
            
            .then((res) => (res.json()))
            .then((trailers) => {
                this.setState({trailers: trailers,
                mensaje: "No hay trailers disponibles",granted: true},() => (console.log(this.state.trailers)));
                console.log("tengo datos")
                console.log(trailers)
            })
            .then((data)=>{
                if (this.state.trailers.length !==0) 
                    this.setState({mensaje: "Trailers"})
                })
            .catch(() => (this.setState({trailers:[],mensaje: "Acceso denegado",granted:false})))    
    }


    renderContent = () => {
            console.log(this.state.trailers != undefined)
                var news = [];
                if(this.state.trailers != undefined){
                        news = this.state.trailers.map((trailer) => (
                            <tr key={trailer.id_trailer}>
                                <td>{trailer.id_trailer}</td>
                                <td>{trailer.titulo}</td>
                                <td>{trailer.descripcion}</td>
                                <td><Link className="button mr-10" rep to={{
                                    pathname: `/detalleTrailer`,
                                    state:{
                                        id: trailer.id_trailer,
                                        titulo: trailer.titulo,
                                        descripcion: trailer.descripcion,
                                        tipo: trailer.tipo,
                                        archivo: trailer.archivo
                                    }
                                }}>Ver Trailer</Link>
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


export default TrailersContainer;