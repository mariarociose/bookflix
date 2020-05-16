import React from "react";
import ReactDOM from "react-router-dom";
import CommonDisplay from "../CommonDisplay";


class DetalleNovedad extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            titulo: "",
            descripcion: "",
            header: ""
        }

    }

    componentDidMount(){
        let {titulo,descripcion} = this.props.location.state;
        this.setState({titulo,descripcion,header: titulo})
    }


    handleChange = (e) => (
        this.setState({[e.target.name]: e.target.value},()=>(console.log(this.state)))
    )

    renderContent(){

        return(
        <div>
            <form action="">
                <h1>Novedad: {this.state.header}</h1>
                <input type="text" name="titulo" id="" value={this.state.titulo} onChange={this.handleChange}/>
                <input type="text" name="descripcion" id=""value={this.state.descripcion} onChange={this.handleChange}/>
            </form>
        </div>
        )
    }
}


export default DetalleNovedad;
