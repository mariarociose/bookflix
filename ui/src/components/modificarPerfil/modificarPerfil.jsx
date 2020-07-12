import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import "./new-profile.css"
import Cookie from "js-cookie";
import  * as QueryString from "querystring";
class EditProfile extends CommonDisplay{


    constructor(props){
        super(props);
        let queryString = this.props.location.search.substring(1);
        console.log(queryString)
        
        this.state = {
            currentImg: queryString.split("&")[0].split("=")[1],
            responseText: "",
            name: queryString.split("&")[1].split("=")[1]
        }

    }

    handleChange = (e) =>{
        this.setState({currentImg: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("userId", Cookie.get("userId"));
        form.append("perfilId", Cookie.get("perfilId")); 
        form.append("nombre", e.target.nombrePerfil.value);
        form.append("avatar", e.target.avatar.value);        
        console.log(form)
        fetch("http://localhost:4000/altaPerfil",{
            method: "PUT",
            body: form
        })
        .then((res) => (res.json()))
        .then((res) => (this.setState({responseText: res.text})))
        .catch(() => (this.setState({responseText: "Hubo un error"})))


    }

    renderContent = () => {

        return(
            <div className="new-profile">
                <form className="box" onSubmit={this.handleSubmit}>
                    <label htmlFor="">Avatar</label>
                    <div className="imgContainer">
                        <img src={`http://localhost/avatars/${this.state.currentImg}`} alt="avatar"/>
                    </div>
                    <select value={this.state.currentImg} required name="avatar" id="selectAvatar" onChange={this.handleChange}>
                        <option value="shark.jfif">Tiburon</option>
                        <option value="astro.png">Astronauta</option>
                        <option value="pelota.png">Pelota</option>
                        <option value="luci.jpeg">Luci</option>
                    </select>
                    <label htmlFor="">Nombre</label>
                    <input required type="text" name="nombrePerfil" id="inputName" value={this.state.name} onChange={(e) => (this.setState({name: e.target.value}))}/>
                    {this.state.responseText}
                    <input type="submit" id="newButton" value="Modificar Perfil"/>
                    
                </form>


            </div>
        )
    }

}

export default EditProfile;