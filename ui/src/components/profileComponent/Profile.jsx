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
import "./profile.css"

class Editprofile extends CommonDisplay{

    constructor(props){
        super(props);
        this.state = {
          user: {},
          userId: ""
        }
    }
    
    async componentDidMount(){
        if(Cookie.get("userType") == "1"){
            if(Cookie.get("userId")!= null){
                let userId = Cookie.get("userId")
                userId = JSON.parse(userId)
                console.log("HOOOLAAAAAAAAAAAA")
                console.log(userId)

                await fetch((`http://localhost:4000/profileData?userId=${userId}`),{
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json",
                        "access-token": Cookie.get("token").toString()
                        }
                    })
                    .then((res) => (res.json()))
                    .then((data) => {
                        this.setState({user:data}, () => (console.log(this.state)))
                })
                }
            else
            this.props.history.push("/homeAdmin");
        }else this.setState({mensaje: "Acceso denegado"})
    }

    handleGo = () => {
        this.props.history.push("/editprofile");
        }


    
    renderContent = () => {

              return(

              <div>
               

                <div className="create_form">
                      <h1> Mi perfil</h1>
                      <form onSubmit={this.handleGo} className="book_form" allign='center' >
                  <fieldset className="create_field"> 
                      <h3>Nombre</h3>
                      <p>{this.state.user.nombre}</p> 

                      <h3>Apellido</h3>
                      <p>{this.state.user.apellido}</p> 

                      <h3>Contraseña</h3>
                      <p>{this.state.user.password}</p> 

                      <h3>Email</h3>
                      <p>{this.state.user.email}</p> 

                      <button type="submit" value="Guardar" class="saveButton">
                      Editar Perfil
                      </button>
                        </fieldset>
                    </form>
                </div>

</div>
)
}}
export default Editprofile;
