import React from "react";
import ReactDOM from "react-dom";
import "../css/login.css";
import Cookie from "js-cookie";



class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            
            mensaje : ""
        }

           
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
        
        let data = new FormData(e.target)
        let userType = e.target.userType.value;
        console.log(userType);
        fetch("http://localhost:4000/autenticar",{
            method: "POST",
            body: data
        })
        .then((res) => (res.json()))
        .then((data) => {
            console.log(data);
            
            this.setState({mensaje: data.mensaje})
            Cookie.set("token",data.token);
            if(Cookie.get("token")!= null)
                Cookie.set("user", data.user);
                if(userType == "1")
                    this.props.history.push("/home");
                else
                    this.props.history.push("/homeAdmin");
                })  
        .catch((err) => (console.log(err)))
        
    }
    
    

    
    handleChange = (e) => {
    
        let name = e.target.name;
        let value = e.target.value;
    
        this.setState({[name]: value});
        
    
    }

    


    render(){
        



        let mensaje = <p>{this.state.mensaje}</p>
        return(
            <div className="container">
                
                <div className="formContainer">
                    <form onSubmit={this.handleSubmit}>
                        <p>¿Que tipo de usuario es?</p>
                        <label > Usuario</label>
                        <input required  type="radio" name="userType" value="1" checked={true}/>
                        <label > Admin</label>    
                        <input required type="radio" name="userType" value="2"/>
                        <br></br>
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