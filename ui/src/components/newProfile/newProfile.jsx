import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
import "./new-profile.css"
import Cookie from "js-cookie";

class NewProfile extends CommonDisplay{


    constructor(props){
        super(props);

        this.state = {
            currentImg: "shark.jfif",
            responseText: ""
        }

    }

    handleChange = (e) =>{
        this.setState({currentImg: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("userId", Cookie.get("userId")); 
        form.append("nombre", e.target.nombrePerfil.value);
        form.append("avatar", e.target.avatar.value);        
        console.log(form)
        fetch("http://localhost:4000/altaPerfil",{
            method: "POST",
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
                    <select required name="avatar" id="selectAvatar" onChange={this.handleChange}>
                        <option value="shark.jfif">Tiburon</option>
                        <option value="astro.png">Astronauta</option>
                        <option value="pelota.png">Pelota</option>
                        <option value="luci.jpeg">Luci</option>
                    </select>
                    <label htmlFor="">Nombre</label>
                    <input required type="text" name="nombrePerfil" id="inputName"/>
                    {this.state.responseText}
                    <input type="submit" id="newButton" value="Agregar Perfil"/>
                    
                </form>


            </div>
        )
    }

}

export default NewProfile;