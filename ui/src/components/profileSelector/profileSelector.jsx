import React from "react";
import ReactDOM from "react-dom";
import "./profileSelector.css"
import Cookie from "js-cookie"
import Perfil from "../perfilComponent/perfilComponent";
class ProfileSelector extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userId: Cookie.get("userId"),
            perfiles: []
        }
    
    }

    componentDidMount(){
        
        fetch(`http://localhost:4000/getPerfiles?userId=${this.state.userId}`)
        .then((res) => res.json())
        .then((res) => this.setState({perfiles: res.perfiles},console.log(res)))
        .catch((err) => (console.log(err)))
    }

    render(){
        
        return(
        <div className="profileSelector">
            {this.state.perfiles.map((prof) => (<Perfil perfil={prof}></Perfil>))}          
        </div>)
    }


}

export default ProfileSelector;