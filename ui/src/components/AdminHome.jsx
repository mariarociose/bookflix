import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "./CommonDisplay";
import Novedad from "../components/novedadComponent/NovedadComponent";
import "./userHome.css"

class AlbumContainer extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            news: []
        }

    }

    componentDidMount(){

    }

    renderContent(){

        return(
            <div >
                <h1> Home Administradores </h1>
            </div>
        )
    }


}

export default AlbumContainer;
