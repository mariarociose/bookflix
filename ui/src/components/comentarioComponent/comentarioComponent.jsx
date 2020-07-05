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
        this.setState({visible : true})
    }

    
    render(){

        let content;
        if(this.state.visible){
            content = (
            <div className="comentario-texto">
                <p>{this.props.comentario.comentario}</p>  
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