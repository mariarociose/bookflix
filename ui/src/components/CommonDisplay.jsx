import React from "react";
import NavBar from "./navBarComponent/NavBar";

class CommonDisplay extends React.Component{


    render(){
        return(
            <div>
            <NavBar></NavBar>
            {this.renderContent()}
            </div>
        )

    }

}

export default CommonDisplay;
