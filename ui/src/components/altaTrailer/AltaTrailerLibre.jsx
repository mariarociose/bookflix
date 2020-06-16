import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";
class AltaTrailerLibre extends CommonDisplay{

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
    //    fetch(`http://localhost:4000/countTrailer?id=${this.props.location.state.id_libro}`)
    //    .then((res) => (res.json()))
    //    .then((res) => (this.setState({cant: res.cantidad},console.log(this.state))))

//        fetch(`http://localhost:4000/maxCapitulos?id=${this.props.location.state.id_libro}`)
//        .then((res) => (res.json()))
//        .then((res) => this.setState({maxCant: res.cantidad}))

    }


    parsePath = (path) =>{
        let aux = path.split("fakepath\\")
        return aux[1];
    }


    handleSubmit = (e) => {

        e.preventDefault();
        console.log(this.state.cant)
        if(this.state.cant >= 0){
            var form = new FormData();
            //form.append("id_libro",this.props.location.state.id_libro);
            form.append("titulo",e.target.titulo.value);
            form.append("descripcion",e.target.descripcion.value);
            form.append("archivo",this.parsePath(e.target.archivo.value));
            form.append("tipo",e.target.vp.value)



            fetch("http://localhost:4000/altaTrailerSinLibro",{
                method: "POST",
                body: form
            })
            .then((res) => (res.json()))
            .then((res) => (this.setState({mensaje: res.mensaje,cant: this.state.cant + 1},console.log(this.state))))
            .catch((error) => (this.setState({mensaje: error})))
        }else{
            this.setState({mensaje: "El libro ya posee un trailer asociado"})
        }
        e.target.reset();
    }

    renderContent(){

       return(
            <div>
            <h1>Alta de trailer sin libro</h1>
           {this.state.mensaje}
            <div className="book_form">
            <form className="create_form" action="" onSubmit={this.handleSubmit}>
              <fieldset className="create_field">

                <label htmlFor="">Titulo:</label>
                <input required type="text" name="titulo" id="titulo"/>

                <label htmlFor="">Descripción:</label>
                <input required type="text" name="descripcion" id="descripcion"/>

                <label htmlFor="">Archivo:</label>
                <input type="file" name="archivo" id="archivo"/>

                <label htmlFor="">Video o pdf: </label>
                <label htmlFor="">Video:</label>
                <input required type="radio" name="vp" id="vp" value="video"/>
                <label htmlFor="">PDF:</label>
                <input required type="radio" name="vp" id="vp" value="pdf"/>
              </fieldset>


                <input type="submit" class="saveButton" value="Agregar Trailer"/>
                <button type="reset" value="Cancelar" class="resetButton">
                Cancelar
                </button>


            </form>

        </div>
        </div>
       )
    }


}


export default AltaTrailerLibre
