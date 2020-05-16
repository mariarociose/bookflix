import React from "react";
import ReactDOM from "react-dom";

import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png";


import { makeStyles } from '@material-ui/core/styles';


import CommonDisplay from "../CommonDisplay";
import Libro from "../libroComponent/Libro";

class Libro_detail extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
          id_libro: "",
          mensaje: "",
          header : ""
        }
    }

      componentDidMount(){
          let {id_libro} = this.props.location.state;
          this.setState({id_libro,header: id_libro})
          console.log(id_libro)
          if(Cookie.get("token")!= null){
              fetch(`http://localhost:4000/libros_by_id/${id_libro}`,{
                  method:"POST",
                  headers:{
                      "Content-Type": "application/json",
                      "access-token": Cookie.get("token").toString()

                  }
              })
              .then((res) => (res.json()))
              .then((libro) => {
                  console.log(libro)
                  if(libro.datos.length == 0) libro.mensaje = "no hay libro";
                  this.setState({libro: libro.datos,
                  mensaje: libro.mensaje,granted: true});

              })
              .catch(() => (this.setState({libro:[],mensaje: "Acceso denegado",granted: false})))
          }else this.setState({mensaje: "Acceso denegado"})
      }

      renderContent(){
        console.log(this.libro)


        return(
          <div>
            <p>Detalle de Libro</p>
              <h1>Novedad: {this.state.header}</h1>



          </div>

        )
        }



}
export default Libro_detail;
