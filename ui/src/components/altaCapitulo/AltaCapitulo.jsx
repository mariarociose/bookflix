import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
class AltaCapitulo extends CommonDisplay{

    constructor(props){
        super(props);
        this.state = {
            libros: [],
            mensaje: "",
            cant: 0,
            maxCant: 0
        }
    
    }

    componentDidMount(){
        fetch(`http://localhost:4000/countCapitulos?id=${this.props.location.state.id_libro}`)
        .then((res) => (res.json()))
        .then((res) => (this.setState({cant: res.cantidad},console.log(this.state))))
        
        fetch(`http://localhost:4000/maxCapitulos?id=${this.props.location.state.id_libro}`)
        .then((res) => (res.json()))
        .then((res) => this.setState({maxCant: res.cantidad}))

    }

     parsePath = (path) =>{
        let aux = path.split("fakepath\\")
        return aux[1];
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
        console.log(this.state.cant)
        if(this.state.cant < this.state.maxCant){
            var form = new FormData();
            form.append("id_libro",this.props.location.state.id_libro);
            form.append("titulo",e.target.titulo.value);
            form.append("descripcion",e.target.descripcion.value);
            form.append("archivo",this.parsePath(e.target.archivo.value));
            form.append("fecha",e.target.fecha.value);
            


            fetch("http://localhost:4000/altaCapitulo",{
                method: "POST",
                body: form
            })
            .then((res) => (res.json()))
            .then((res) => (this.setState({mensaje: res.mensaje,cant: this.state.cant + 1},console.log(this.state))))
            .catch((error) => (this.setState({mensaje: error})))
        }else{
            this.setState({mensaje: "El libro ya posse la totalidad de capitulos"})
        }
        e.target.reset();
    }

    renderContent(){
       
       return(
            <div>
            <h1>Alta de capítulo</h1>
           {this.state.mensaje}
            <div className="book_form">
            <form className="create_form" action="" onSubmit={this.handleSubmit}>
              <fieldset className="create_field">
               
                <label htmlFor="">Titulo:</label>
                <input required type="text" name="titulo" id="titulo"/>

                <label htmlFor="">Descripción:</label>
                <input required type="text" name="descripcion" id="descripcion"/>
                
                <label htmlFor="">Fecha de Vencimiento:</label>
                <input required type="date" name="fecha" id="fecha"/>
                
                <label htmlFor="">Archivo:</label>
                <input type="file" name="archivo" id="archivo"/>


              </fieldset>


                <input type="submit" class="saveButton" value="Agregar Capitulo"/>
                <button type="reset" value="Cancelar" class="resetButton">
                Cancelar
                </button>


            </form>

        </div>
        </div>
       )
    }


}


export default AltaCapitulo