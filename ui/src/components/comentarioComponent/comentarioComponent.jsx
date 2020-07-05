import React from "react";
import ReactDOM from "react-dom";
import "./comentarios.css";

class ComentarioComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            visible: true
        }
    
    }
    
    
    componentDidMount(){
        if(this.props.comentario.status_comentario == 2){
            this.setState({visible: false})
        }
    }

    handleClick = () => {
        this.setState({visible : !this.state.visible})
    }

    
    render(){

        let content;
        if(this.state.visible){
            let buttonS;
            if(this.props.comentario.status_comentario == 2) {
                buttonS = <button className="spoiler-button" onClick={this.handleClick}>ocultar spoiler</button>
            }
            content = (
            <div className="comentario-texto">
                <p>{this.props.comentario.comentario}</p>
                {buttonS}
            </div>)
        }else{
            
            content = (
                <div className="spoiler">
                    <p>Este comentario contiene spoiler</p>
                    <button onClick={this.handleClick} className="spoiler-button">  mostrar spoiler </button>
                </div>
                )
                          
        }
        

        return (
            <div className="comentario-container">
            <div className="comentario">
                <div className="datos">
                    <p>{this.props.comentario.nombre}</p> <p>Puntuacion: {this.props.comentario.puntuacion}</p>
                    
                </div>
                {content}
                
            </div>
            </div>
        )
    }
}

export default ComentarioComponent;