import React from "react";
import ReactDOM from "react-dom";
import "./profile.css";
import Cookie from "js-cookie";



class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          user : ""
      }
    }
    
    render(){
        let user = Cookie.get("user");
        //de la cookie lo sacas en formato json(string largo)
        //hay que pasarlo a un objeto js
        user = JSON.parse( user );
        return (
          <div className="container">
            <div className="profilebox">
             <h1>Mis datos</h1>
              <div className="datos">
                <div className="tipodato">
                    <p>Nombre</p>
                    <p>Apellido</p>
                    <p>E-mail</p>
                </div>
                <div className="midato">
                    <p>{user.nombre}</p>
                    <p>{user.apellido}</p>
                    <p>{user.email}</p>
                </div>
              </div>
              <a href="./editprofile"> Editar Perfil</a>
            </div>
          </div>
          );
        }
}

export default Profile;
