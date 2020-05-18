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
          userId: "",
          nombre: "",
          apellido:"",
          email:"",
          password:"",
          password2:"",
          id:"",
          editing: false
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
                        this.setState({user:data,nombre:data.nombre,apellido:data.apellido,
                        email:data.email,password:data.password, password2:data.password, id: data.id_usuario},
                        () => (console.log(this.state)))
                })
                }
            else
            this.props.history.push("/homeAdmin");
        }else this.setState({mensaje: "Acceso denegado"})
    }

    handleChange = (e) => (
        this.setState({[e.target.name]: e.target.value},()=>(console.log(this.state)))
    )

   
    handleClick = (e) => {
       this.setState({editing: !this.state.editing})
    }
   
    handleSubmit = (e) => {
        console.log("HOOOOLA MAAAAAATI")
        e.preventDefault();
        let formData = new FormData();
        formData.append("nombre",e.target.nombre.value);
        formData.append("apellido",e.target.apellido.value);
        formData.append("email",e.target.email.value);
        formData.append("password",e.target.password.value);
        formData.append("password2",e.target.password2.value);
        formData.append("id",this.state.id);

            if(this.state.password === this.state.password2){
                fetch("http://localhost:4000/editProfile",{
                method:"POST",
                body: formData
                })

                .then((res) => (res.json()))
                .then((data) => (this.setState({editing: false})))
                .catch((err) => (console.log(err)))

                this.props.history.push("/profile");
            }
            else 
                this.setState({password:"Contraseñas no coinciden", password2:"Contraseñas no coinciden"})        


    }

    handleCancel = () => {
        this.props.history.push("/profile");
        }

    renderContent = () => {
        console.log(this.state)
        let buttons;
   
        if(!this.state.editing){
            buttons = <input type="button" value="Actualizar"class="editButton" id="update" onClick={this.handleClick}></input>
        }else{
            buttons = (
            <div>
                <input type="submit" value="Aceptar" class="saveButton" id="accept"></input>
                <input type="button" value="Cancelar" class="resetButton" id="cancel" onClick={this.handleCancel}></input>
            </div>
            )
        }

              return(

              <div>
               

                <div className="create_form">
                      <h1> Editar mi perfil</h1>
                    <form className="book_form" allign='center' onSubmit={this.handleSubmit}>
                        <fieldset className="create_field"> 

                        <label htmlFor="nombre">Nombre</label>
                            <input required disabled={!this.state.editing} type="text" 
                            name="nombre" id="" value={this.state.nombre} onChange={this.handleChange}/>
                            
                            <label htmlFor="apellido"> Apellido: </label>
                            <input required disabled={!this.state.editing} type="text" 
                            name="apellido" id="" value={this.state.apellido} onChange={this.handleChange}/>
                            
                            <label htmlFor="email"> Email:</label>
                            <input required disabled={!this.state.editing} type="text"
                             name="email" id="" value={this.state.email} onChange={this.handleChange}/>
                            
                            <label htmlFor="password"> Constraseña:</label>
                            <input required disabled={!this.state.editing} type="text"
                             name="password" id="" value={this.state.password} onChange={this.handleChange}/>
                            
                            <label htmlFor="password2"> Repetir Constraseña:</label>
                            <input required disabled={!this.state.editing} type="text"
                             name="password2" id="" value={this.state.password2} onChange={this.handleChange}/>
                            {buttons}

                        </fieldset>
                    </form>
                </div>

</div>
)
}}
export default Editprofile;
