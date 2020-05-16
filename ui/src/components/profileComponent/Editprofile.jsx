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

class Profile extends CommonDisplay{

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


    renderContent = () => {

              return(

              <div>
               

                <div className="create_form">
                      <h1> Editar mi perfil</h1>
                    <form className="book_form" allign='center' >
                        <fieldset className="create_field"> 
                            <label for="titulo">Nombre:</label>
                            <input type="text" value={this.state.user.nombre} id="nombre"  required  name="nombre"/>

                            <label for="lastname"> Apellido:</label>
                            <input type="text" value={this.state.user.apellido} required maxLength="13" minLength="13" name="lastname"/>

                            <label for="password"> Constraseña:</label>
                            <input type="text" value={this.state.user.password} required maxLength="13" minLength="13" name="pasword"/>

                            <label for="card"> Email:</label>
                            <input type="text" value={this.state.user.email} required maxLength="13" minLength="13" name="card"/>

                            <button type="submit" value="Guardar" class="saveButton">
                            Guardar
                            </button>
                            <button type="reset" value="Cancelar" class="resetButton">
                            Cancelar
                            </button>
                        </fieldset>
                    </form>
                </div>

</div>
)
}}
export default Profile;
