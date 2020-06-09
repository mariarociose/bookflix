import React from "react";
import ReactDOM from "react-router-dom";
import CommonDisplay from "../CommonDisplay";

class DetalleTrailer extends CommonDisplay{

    constructor(props){
       super(props);
       console.log(this.props)
       this.state = {
           id: "",
           descripcion: "",
       }
   }

     componentDidMount () {
        let {titulo,descripcion} = this.props.location.state;
        this.setState({titulo,descripcion,header: titulo})
    }

    renderContent(){
        console.log(this.state)

        return(
        <div className="book_form">
            <form  className="create_form" onSubmit={this.handleSubmit}>
               <fieldset className="create_field">
                <h1>Detalle de Novedad</h1>
                <label htmlFor="titulo">Titulo</label>
                <input required disabled={!this.state.editing} type="text"  name="titulo" id="" value={this.state.titulo} onChange={this.handleChange}/>
                <label htmlFor="descripcion">Descripción</label>
                <input required disabled={!this.state.editing} type="text" name="descripcion" id=""value={this.state.descripcion} onChange={this.handleChange}/>
               </fieldset>
            </form>
        </div>
        )
    }




}
   

export default DetalleTrailer;
