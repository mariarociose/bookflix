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
          titular:"",
          dni:"",
          cardId:"",
          cardCod:"",
          vencimiento:"",
          tarjetas:[],
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
                        email:data.email,password:data.password, password2:data.password, id: data.id_usuario, titular:data.tarjeta_titular, dni:data.tarjeta_dni,cardId:data.tarjeta_numero, cardCod: data.tarjeta_ccv,tipo: data.tarjeta_tipo_id, vencimiento: data.tarjeta_fecha_vencimiento },
                        () => (console.log(this.state)))
                })

                

    

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
        formData.append("titular",e.target.titular.value);
        formData.append("dni",e.target.dni.value);
        formData.append("cardCod",e.target.cardCod.value);
        formData.append("cardId",e.target.cardId.value);
        formData.append("Fecha_vencimiento",e.target.Fecha_vencimiento.value);
        formData.append("tipo",e.target.tipo.value);

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

        let tarjetas_select = [];
        console.log(this.state.tarjetas);
        tarjetas_select = this.state.tarjetas.map((tarjeta) => (
                //El map es como el collect de pharo
                <option key={tarjeta.id_tarjeta_tipo} value={tarjeta.id_tarjeta_tipo}>{tarjeta.descripcion} </option>
        ))



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
                            <input required disabled={!this.state.editing} minLength = "4" type="text" 
                            name="nombre" id="" value={this.state.nombre} onChange={this.handleChange}/>
                            
                            <label htmlFor="apellido"> Apellido: </label>
                            <input required disabled={!this.state.editing} minLength = "4" type="text" 
                            name="apellido" id="" value={this.state.apellido} onChange={this.handleChange}/>
                            
                            <label htmlFor="email"> Email:</label>
                            <input required disabled={!this.state.editing} minLength = "4" type="text"
                             name="email" id="" value={this.state.email} onChange={this.handleChange}/>
                            
                            <label htmlFor="password"> Constraseña:</label>
                            <input required disabled={!this.state.editing} minLength = "6" maxLength = "8" type="text"
                             name="password" id="" value={this.state.password} onChange={this.handleChange}/>
                            
                            <label htmlFor="password2"> Repetir Constraseña:</label>
                            <input required disabled={!this.state.editing} minLength = "6" maxLength = "8" type="text"
                             name="password2" id="" value={this.state.password2} onChange={this.handleChange}/>
                            

                            <label htmlFor="card"> Titular tarjeta</label>
                            <input required disabled={!this.state.editing} minLength = "5" maxLength = "8" type="text" 
                            name="titular" id="card" value={this.state.titular} onChange={this.handleChange}/>

                            <label htmlFor="card"> DNI Titular tarjeta</label>
                            <input required disabled={!this.state.editing} type="text" 
                            pattern="[0-9]*"  name="dni" id="card" value={this.state.dni} minLength="8" maxLength="8" onChange={this.handleChange}/>

                            <label htmlFor="card"> Numero tarjeta</label>
                            <input required disabled={!this.state.editing} minLength = "16" maxLength = "16" type="text" 
                            name="cardId" id="card" pattern="[0-9]*" value={this.state.cardId} onChange={this.handleChange}/>
                            
                            <label for="cardCod"> Código Tarjeta</label>
                            <input required disabled={!this.state.editing} type="text" minLength = "3" maxLength = "3"
                            name="cardCod" id="card" pattern="[0-9]*" value={this.state.cardCod} onChange={this.handleChange}/>

                            <label for="tipo">Tipo tarjeta</label>
                                <select required disabled={!this.state.editing} id="tipo" name="tipo" onChange={this.handleChange}>
                                    {tarjetas_select}
                                </select> 

                            <label for="vencimiento">Vencimiento:</label>
                            <input required disabled={!this.state.editing} type='date' 
                            name="vencimiento" id="Fecha_vencimiento" value={this.state.vencimiento} onChange={this.handleChange}/>
                            
                            {buttons}

                        </fieldset>
                    </form>
                </div>

</div>
)
}}
export default Editprofile;
