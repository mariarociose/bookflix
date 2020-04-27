import React from "react";
import ReactDom from "react-dom";

class Detail extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Titulo</h1>
                <img src="https://source.unsplash.com/random"></img>
            </div>


        )
    }


}

export default Detail;