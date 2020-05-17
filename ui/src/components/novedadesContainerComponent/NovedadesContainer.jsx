import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import {Link} from "react-router-dom";
import Cookie from "js-cookie";

class NovedadesContainer extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            novedades: [],
            mensaje: "",
            granted : false
        }
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
                            <td><Link className="button" rep to={{
                                pathname: `/detalleNovedad`,
                                state:{
                                    id: novedad.id_novedad,
                                    titulo: novedad.titulo,
                                    descripcion: novedad.descripcion
                                }
                            }}>Ver Detalle</Link></td>
                            
                        </tr>)
                        
                );
                
            }
        
        if(this.state.granted){
                var tabla = (
                    
                <main>
                   
                    <div className='Nuevo'>
                        <a  className='button' href='#'>
                        Agregar Novedad
                        </a>
                        </div>
                        <table  className="table table-bordered table-hover" >

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
                        </table>

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
