import React from "react";
import ReactDOM from "react-router-dom";
import CommonDisplay from "../CommonDisplay";
import "./detalleNovedad.css";

class DetalleNovedad extends CommonDisplay{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            titulo: "",
            descripcion: "",
            editing: false

        }

    }

    componentDidMount(){
        let {titulo,descripcion} = this.props.location.state;
        this.setState({titulo,descripcion,header: titulo})
    }


    handleChange = (e) => (
        this.setState({[e.target.name]: e.target.value},()=>(console.log(this.state)))
    )

    handleClick = (e) => {
       this.setState({editing: !this.state.editing})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("titulo",e.target.titulo.value);
        formData.append("id",this.props.location.state.id);
        formData.append("descripcion",e.target.descripcion.value);
        fetch("http://localhost:4000/novsAdmin",{
            method:"POST",
            body: formData
        })
        .then((res) => (res.json()))
        .then((data) => (this.setState({editing: false})))
        .catch((err) => (console.log(err)))

    }

    renderContent(){
        console.log(this.state)
        let buttons;

        if(!this.state.editing){
            buttons = <input type="button" value="Actualizar" id="update" onClick={this.handleClick}></input>
        }else{
            buttons = (
            <div>
                <input type="submit" value="Aceptar" id="accept"></input>
                <input type="button" value="Cancelar" id="cancel" onClick={this.handleClick}></input>
            </div>
            )
        }

        return(
        <div className="detalleNovedad">
            <form onSubmit={this.handleSubmit}>
                <h1>Detalle de Novedad</h1>
                <label htmlFor="titulo">Titulo</label>
                <input required disabled={!this.state.editing} type="text" name="titulo" id="" value={this.state.titulo} onChange={this.handleChange}/>
                <label htmlFor="descripcion">Descripción</label>
                <input required disabled={!this.state.editing} type="text" name="descripcion" id=""value={this.state.descripcion} onChange={this.handleChange}/>
                {buttons}

            </form>
        </div>
        )
    }
}


export default DetalleNovedad;
