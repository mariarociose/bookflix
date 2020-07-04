import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";

import {Player} from "video-react";

import "./video-react.css";

class TrailerDisplay extends CommonDisplay{

    constructor(props){
        super(props);


    }



    renderContent(){
        let url = `http://127.0.0.1/trailers/${this.props.location.state.archivo}`

        return(
            <div>
            <h1>{this.props.location.state.titulo}</h1>
            <div className="trailerContainer">
                
                <Player 
                playsInline
                fluid={false}
                src={url}
                width={480}
                height={272}></Player>
            </div>
            </div>

        )        

    }
}

export default TrailerDisplay;