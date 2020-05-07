import React from "react";
import ReactDOM from "react-dom";
import "./login.css";
import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png"



class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            datos: {}
        }
    }


    getData = (form) => (

        fetch("http://localhost:4000/autenticar",{
            method: "POST",
            body: new FormData(form)
        })
        .then((res) => (res.json()))
        .then((data) => {
            this.setState({datos:data}, () => (console.log(this.state.datos)))
        })
    
    )


    redirect = () => {
        
        if(this.state.datos != undefined){
            if(this.state.datos.user != null){
                Cookie.set("token",this.state.datos.token);
                Cookie.set("userType",this.state.datos.userType);
                if(this.state.datos.userType == "1")
                    this.props.history.push("/home");
                else
                    this.props.history.push("/homeAdmin");    
        }}
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
        this.getData(e.target) //retorna Promise, las promises las manejamos con then. Fetch tmb retorna promise
        .then(() => {
            
            this.redirect()
           
        })

        e.target.reset();
       
    }

    render(){
        

        let mensaje = <p>{this.state.datos.mensaje} </p>
        return(
            <div className="loginbox">
                <img src={AvatarLogo} alt="avatarPic" className="avatarLogo"/>
                <h1 >Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label > Usuario</label>
                    <input required  type="radio" name="userType" value="1" checked={true}/>
                    <label > Admin</label>    
                    <input required type="radio" name="userType" value="2"/>
                    <p>Email</p>
                    <input required minLength = "6" type="email" name="email" id="userInput"/>
                    <p>Password</p> 
                    <input required minLength = "6" maxLength = "8" type="password" name="password" id="userPassword"/>
                    {mensaje}
                    <input type="submit" value="Iniciar Sesion"/>
                    <a href=""> ¿No tiene cuenta?</a>
                </form>
            </div>

            
        )
    }
}

export default Login;