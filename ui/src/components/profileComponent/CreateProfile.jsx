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

class CreateProfile extends CommonDisplay{

    constructor(props){
        super(props);
        this.state = {
          nombre: "",
          apellido:"",
          email:"",
          password:"",
          password2:"",
          titular:"",
          dni:"",
          cardId:"",
          cardCod:"",
          vencimiento:"",
          tarjetas:[],
        }
    }

    componentDidMount(){

            fetch("http://localhost:4000/tiposTarjeta",{
                method:"GET"
            })
            .then((res) => (res.json()))
            .then((tarjetas) => {
                console.log(tarjetas)

                if(tarjetas.length == 0) tarjetas.mensaje = "No hay tarjetas";
                this.setState({tarjetas: tarjetas,
                mensaje: tarjetas.mensaje});

            })
            .catch(() => (this.setState({tarjetas:[],mensaje: "Acceso denegado"})))
    }


    handleChange = (e) => (
        this.setState({[e.target.name]: e.target.value},()=>(console.log(this.state)))
    )

   
   
    handleSubmit = (e) => {

        e.preventDefault();
        let formData = new FormData();
   
            formData.append("nombre",e.target.nombre.value);
            formData.append("apellido",e.target.apellido.value);
            formData.append("email",e.target.email.value);
            formData.append("password",e.target.password.value);
            formData.append("password2",e.target.password2.value);
            formData.append("titular",e.target.titular.value);
            formData.append("dni",e.target.dni.value);
            formData.append("cardCod",e.target.cardCod.value);
            formData.append("cardId",e.target.cardCod.value);
            formData.append("Fecha_vencimiento",e.target.Fecha_vencimiento.value);
            formData.append("tipo",e.target.tipo.value);

            if(this.state.password === this.state.password2){
                fetch("http://localhost:4000/createProfile",{
                method:"POST",
                body: formData
               
                .then((res) => (res.json()))
                .then((data) => (this.setState({user:data})))
                .catch((err) => (console.log(err)))
                })


                fetch("http://localhost:4000/createCard",{
                method:"POST",
                body: formData
               
                .then((res) => (res.json()))
                .then((data) => (this.setState({editing: false})))
                .catch((err) => (console.log(err)))
                })


                this.props.history.push("/login");
            }
            else 
                this.setState({password:"Contraseñas no coinciden", password2:"Contraseñas no coinciden"})        

    }

    handleCancel = () => {
        this.props.history.push("/login");
        }

    renderContent = () => {
        console.log(this.state)

        let tarjetas_select = [];
                  console.log(this.state.tarjetas);
                  tarjetas_select = this.state.tarjetas.map((tarjeta) => (
                          //El map es como el collect de pharo
                    <option key={tarjeta.id_tarjeta_tipo} value={tarjeta.descripcion}>{tarjeta.descripcion} </option>
                  ))

              return(

              <div>
               

                <div className="create_form">
                      <h1> Crear Usuario</h1>
                    <form className="book_form" allign='center' onSubmit={this.handleSubmit}>
                    <fieldset className="create_field">
                            <label htmlFor="nombre">Nombre</label>
                            <input required minLength = "4"  type="text" id="nombre"  name="nombre"/> 
                            
                            <label htmlFor="lastname"> Apellido: </label>
                            <input required minLength = "4" type="text" id="apellido" name="apellido" />
                            
                            <label htmlFor="email"> Email:</label>
                            <input required minLength = "6" type="email" id="email" name="email" />

                            <label for="password"> Constraseña:</label>
                            <input required minLength = "6" type="password" id="password" name="password" />
                            
                            <label for="password2"> Repetir Constraseña:</label>
                            <input required minLength = "6" type="password" id="password2" name="password2" />

                            <label htmlFor="card"> Titular tarjeta</label>
                            <input required minLength = "4" maxLength = "16" type="text" id="card" name="card" />

                            <label htmlFor="card"> DNI Titular tarjeta</label>
                            <input required minLength = "8" maxLength = "8" type="number" id="card" name="card" />

                            <label htmlFor="card"> Numero tarjeta</label>
                            <input required minLength = "16" maxLength = "16" type="number" id="card" name="card" />
                            
                            <label for="cardCod"> Código Tarjeta</label>
                            <input required minLength = "3" maxLength = "3" type="number" id="cardCod" name="cardCod" />

                            <label for="tipo">Tipo tarjeta</label>
                                <select id="tipo" name="tipo">
                                    {tarjetas_select}
                                </select> 

                            <label for="vencimiento">Vencimiento:</label>
                            <input type='date' required name="Fecha_vencimiento" id="Fecha_vencimiento"/>
                    

                        <input type="submit" value="Aceptar" class="saveButton" id="accept"></input>

                        <input type="button" value="Cancelar" class="resetButton" id="cancel" onClick={this.handleCancel}></input>

                        </fieldset>
                    </form>
                </div>

</div>
)
}}
export default CreateProfile;
