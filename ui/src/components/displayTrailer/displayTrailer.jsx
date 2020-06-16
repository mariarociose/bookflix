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

        return(

            <div className="trailerContainer">
                
                <Player 
                playsInline
                fluid={false}
                src="http://127.0.0.1/trailers/quijote.mp4"
                width={480}
                height={272}></Player>
            </div>


        )        

    }
}

export default TrailerDisplay;