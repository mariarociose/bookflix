import React from "react";
import ReactDOM from "react-dom";
import "./profileSelector.css"
import Cookie from "js-cookie"
import Perfil from "../perfilComponent/perfilComponent";
import { confirmAlert } from 'react-confirm-alert';
class ProfileSelector extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userId: Cookie.get("userId"),
            tipo: Cookie.get("tipo_suscripcion"),
            perfiles: []
        }
    
    }

    componentDidMount(){
        
        fetch(`http://localhost:4000/getPerfiles?userId=${this.state.userId}`)
        .then((res) => res.json())
        .then((res) => this.setState({perfiles: res.perfiles},console.log(res)))
        .catch((err) => (console.log(err)))



    }

    handleErase = (profile) => {
            
            confirmAlert({
                title: '¿Está seguro que desea eliminar el perfil?',
                message: 'Una vez eliminado no podrá recuperarse',
                buttons: [
                    {
                        label: 'Si',
                        onClick: () => {
                                let form = new FormData();
                                form.append("perfilId", profile.id_perfil);
                                fetch("http://localhost:4000/borrarPerfil",{
                                    method: "DELETE",
                                    body: form
                                })
                                .then((res) => (console.log(res)))
                                .then(() => {
                                    let item = this.state.perfiles.indexOf(profile);
                                    let aux = this.state.perfiles;
                                    aux.splice(item,1);
                                    this.setState({perfiles: aux});
                                })
                                .catch((err) => (console.log(err)))
                        }} ,
                        {
                            label: 'No',
                            onClick: () => (null)
                        }
                    
                ]
            })
            
         
            
    }

    handleNewProfile = () => {
        if(this.state.tipo == 0 && this.state.perfiles.length == 2){
            
            this.props.history.push("/changeSuscription/0");


        }else
            this.props.history.push("/newProfile")
    }


    renderNewProfile = () => {
        
       if((this.state.tipo == 1 && this.state.perfiles.length < 4) || (this.state.tipo == 0)){

            return(
                <div className="newProfile">

                        <div onClick={this.handleNewProfile} className="image-container">
                              
                        </div>   

                </div>
            )

       }
       return null;
    }

    render(){
        
        return(
        <div className="profileSelector">
            {this.state.perfiles.map((prof) => (<Perfil update={this.handleErase} perfil={prof} cant={this.state.perfiles.length}></Perfil>))}          
        
            {this.renderNewProfile()}
        </div>)
    }


}

export default ProfileSelector;