import React from "react";
import ReactDOM from "react-dom";
import "./profile.css";
import Cookie from "js-cookie";

import CommonDisplay from "../CommonDisplay";

class Profile extends CommonDisplay{

    constructor(props){
        super(props);
        this.state = {
          user : ""
      }
    }

    componentDidMount (){
        this.getData(Cookie.get("userId").toString());
    }

    getData = (userId) => (

      fetch("http://localhost:4000/profileData",{
          method: "POST",
          body: userId
      })
      .then((res) => (res.json()))
      .then((data) => {
          this.setState({datos:data}, () => (console.log(this.state.datos)))
      })
      .catch((error)=>(console.log(error)))
    )


    render(){
      let user = this.state.datos;
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
                    <p>{user.apellido}</p>
                    <p>{user.email}</p>
                    <p>{user.nombre}</p>
                </div>
              </div>
            </div>
          </div>
          )

    }
}

export default Profile;
