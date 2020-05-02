import React from "react";
import ReactDOM from "react-dom";


class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email : "",
            password : ""
        }

           
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
        fetch("http://localhost:4000/usuarios")
        .then((res) => (res.json()))
        .then((res) => (console.log(res)))
    
    }
    
    

    
    handleChange = (e) => {
    
        let name = e.target.name;
        let value = e.target.value;
    
        this.setState({[name]: value},() => (console.log(this.state.email)));
        
    
    }


    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label >
                        Email: 
                        <input required minLength = "6" type="text" name="email" id="userInput" onChange={this.handleChange}/>
                    </label>
                    <label >
                        Password: 
                        <input required minLength = "6" maxLength = "8" type="text" name="password" id="userPassword" onChange={this.handleChange}/>
                    </label>

                    <input type="submit" value="Iniciar Sesion"/>
                </form>


            </div>
        )
    }
}







export default Login;