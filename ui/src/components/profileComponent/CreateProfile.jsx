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
          mensaje:"",
          tarjeta_numero:"",
          tarjeta_titular:"",
          tarjeta_dni:"",
          tarjeta_tipo_id:"",
          tarjeta_ccv:"",
          tarjeta_vencimiento:"",

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
            //tarjeta
            formData.append("tarjeta_titular",e.target.tarjeta_titular.value);
            formData.append("tarjeta_dni",e.target.tarjeta_dni.value);
            formData.append("tarjeta_numero",e.target.tarjeta_numero.value);
            formData.append("tarjeta_tipo_id",e.target.tarjeta_tipo_id.value);
            formData.append("tarjeta_ccv",e.target.tarjeta_ccv.value);
            formData.append("tarjeta_vencimiento",e.target.tarjeta_vencimiento.value);

            if(e.target.password.value === e.target.password2.value){
                
                fetch("http://localhost:4000/createProfile",{
                method:"POST",
                body: formData
                  })
                .then((res) => (res.json()))
                .then((data) => (this.setState( {user:data} )))
                .catch((err) => (console.log(err)))

                this.props.history.push("/createProfile");
          }
             else
                alert("Contraseñas no coinciden");
    }

    handleCancel = () => {
        this.props.history.push("/login");
    }

    renderContent = () =>{
        console.log(this.state)
      //  let mensaje = <p>{this.state.user.mensaje} </p>
        let tarjetas_select = [];
                  console.log(this.state.tarjetas);
                  tarjetas_select = this.state.tarjetas.map((tarjeta) => (
                          //El map es como el collect de pharo
                    <option key={tarjeta.id_tarjeta_tipo} value={tarjeta.id_tarjeta_tipo}>{tarjeta.descripcion} </option>
                  ))

              return(

              <div>


                <div className="create_form">
                      <h1> Crear Usuario</h1>
                    
                    <form className="book_form" allign='center' onSubmit={this.handleSubmit}>
                    <fieldset className="create_field">
                            <label htmlFor="nombre">Nombre</label>
                            <input required  type="text" id="nombre"  name="nombre"/>

                            <label htmlFor="lastname"> Apellido: </label>
                            <input required minLength = "4" type="text" id="apellido" name="apellido" />

                            <label htmlFor="email"> Email:</label>
                            <input required minLength = "6" type="email" id="email" name="email" />

                            <label for="password"> Constraseña:</label>
                            <input required minLength = "6" type="text" id="password" name="password" />

                            <label for="password2"> Repetir Constraseña:</label>
                            <input required minLength = "6" type="text" id="password2" name="password2" />


                            <label htmlFor="card"> Titular tarjeta</label>
                            <input required  type="text" id="card" name="tarjeta_titular" />

                            <label htmlFor="card"> DNI Titular tarjeta</label>
                            <input required min = "1000000" max = "999999999" type="number" id="card" name="tarjeta_dni" />

                            <label htmlFor="card"> Numero tarjeta (16 digitos)</label>
                            <input required min="1000000000000000" max = "9999999999999999" type="number" id="number" name="tarjeta_numero" />

                            <label for="cardCod"> Código Tarjeta (3 digitos)</label>
                            <input required min = "001" max = "999" type="number" id="cardCod" name="tarjeta_ccv" />

                            <label for="tarjeta">Tipo tarjeta</label>
                                <select id="tarjeta" name="tarjeta_tipo_id">
                                    {tarjetas_select}
                                </select>

                            <label for="vencimiento">Vencimiento:</label>
                            <input type='date' required name="tarjeta_vencimiento" id="tarjeta_vencimiento"/>


                        <input type="submit" value="Aceptar" class="saveButton" id="accept"></input>

                        <input type="button" value="Cancelar" class="resetButton" id="cancel" onClick={this.handleCancel}></input>

                        </fieldset>
                    </form>
                </div>

</div>
)
    }



}
export default CreateProfile;
