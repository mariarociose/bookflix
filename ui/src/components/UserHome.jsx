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

        fetch("http://localhost:4000/novsUser")
        .then((res) => (res.json()))
        .then((data) => (this.setState({news: data},() => (console.log(this.state)))));


    }

    renderContent(){
        let news = this.state.news.map((nov) => (
            <Novedad nov={nov}></Novedad>
        ))
        return(
            <div className="nov-container">
                {news}
            </div>
        )
    }


}

export default AlbumContainer;
