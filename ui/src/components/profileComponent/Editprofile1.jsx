import React from "react";
import ReactDOM from "react-dom";
import "./profile.css";
import Cookie from "js-cookie";

class Editprofile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          datos : {}
      }
    }

    componentDidMount (){

    }

    getData = () => (
      fetch("http://localhost:4000/profileData",{ 
          method: "POST",
          body: userId 
      })
      .then((res) => (res.json()))
      .then((data) => {
          this.setState({datos:data}, () => (console.log(this.state.datos)))
      })
  )


  redirect = () => {
      
      if(this.state.datos != undefined){
          if(this.state.datos.user != null){
              Cookie.set("user", this.state.datos.user);
              if(this.state.datos.userType == "1")
                  this.props.history.push("/profile");
              else
                  this.props.history.push("/homeAdmin");    
      }}
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleEdit = (e) => {
      // acá hacer otro fetch más para tirar los datos nuevos
      //subir datos
      e.preventDefault();
      this.getData(e.target) //retorna Promise, las promises las manejamos con then. Fetch tmb retorna promise
      .then(() => {
          
          this.redirect()
         
      })

      e.target.reset();
     
  }

    
    render(){
        let userId = Cookie.get("userId");
        //de la cookie lo sacas en formato json(string largo)
        //hay que pasarlo a un objeto js
        userId = JSON.parse( userId );
        let mensaje = <p>{this.state.datos.mensaje} </p>
        return (
          <div className="container">
            <div className="profilebox">
             <h1>Mis datos</h1>
              <div className="datos">
                <div className="tipodato">
                    <p>Nombre</p>
                    <p>Apellido</p>
                    <p>E-mail</p>
                    <p>Password</p>
                </div>
                <div className="editperfilbox">
                    <form onSubmit={this.handleEdit}>
                        <input required type="firstname" name="firstname" id="userfirstname" value={user.nombre} onChange={this.handleChange}/>
                        <input required type="lastname" name="lastname" id="userlastname" value={user.apellido} onChange={this.handleChange}/>
                        <input required type="mail" name="mail" id="usermail" value={user.email} onChange={this.handleChange} />
                        <input required type="pass" name="password" id="userPassword" value={user.password} onChange={this.handleChange}/>
                        {mensaje}
                        <input type="submit" value="Guardar"/>
                  </form>
                </div>
              </div>
            </div>
          </div>
          );
        }
}

export default Editprofile;
