import React from "react";
import ReactDOM from "react-dom";
import "../css/login.css";
import Cookie from "js-cookie";
class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email : "",
            password : "",
            mensaje : ""
        }

           
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
        
        let data = new FormData();
        data.append("email",this.state.email);
        data.append("password",this.state.password);
        
        fetch("http://localhost:4000/autenticar",{
            method: "POST",
            body: data
        })
        .then((res) => (res.json()))
        .then((data) => {
            console.log(data);
            this.setState({mensaje: data.mensaje})
            Cookie.set("token",data.token);
            
        })
        .catch((err) => (console.log(err)))
        
    }
    
    

    
    handleChange = (e) => {
    
        let name = e.target.name;
        let value = e.target.value;
    
        this.setState({[name]: value});
        
    
    }


    render(){
        let token = <p> {Cookie.get("token")}</p>
        let mensaje = <p>{this.state.mensaje}</p>
        return(
            <div className="container">
                
                <div className="formContainer">
                    <form onSubmit={this.handleSubmit}>
                        {token}
                        <label >
                            Email: 
                            <input className="input" required minLength = "6" type="email" name="email" id="userInput" onChange={this.handleChange}/>
                        </label>
                        <label >
                            Password: 
                            <input required className="input" minLength = "6" maxLength = "8" type="text" name="password" id="userPassword" onChange={this.handleChange}/>
                        </label>
                        {mensaje}
                        <input type="submit" value="Iniciar Sesion"/>
                    </form>
                </div>

            </div>
        )
    }
}







export default Login;