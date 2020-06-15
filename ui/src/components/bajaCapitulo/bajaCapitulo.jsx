import React from "react";
import ReactDOM from "react-dom";
import CommonDisplay from "../CommonDisplay";

class BajaCapitulo extends CommonDisplay{

    constructor(props){
        super(props);

        this.state = {
            capitulos: [],
            mensaje: ""
        }

    }

    componentDidMount(){
        fetch(`http://localhost:4000/getCapitulos?id_libro=${this.props.location.state.id_libro}`)
        .then((data) => (data.json()))
        .then((data) => (this.setState({capitulos: data},() => (console.log(this.state.capitulos)))))
    }

    fillSelect = (data) => {
        console.log(data);
        
        let options =  data.map((capitulo) => (
           
            <option key={capitulo.id_capitulo} value={capitulo.id_capitulo}>
                {capitulo.titulo}
            </option>
        ))
        return options;

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("id_capitulo", e.target.capitulo.value)
        fetch("http://localhost:4000/getCapitulos",{
            method: "DELETE",
            body: form
        })
        .then((response) => (response.json()))
        .then((response) => {
            
            let item = this.state.capitulos.indexOf(response.eliminado);
            let aux = this.state.capitulos;
            aux.splice(item,1);
            console.log(aux);
            this.setState({capitulos: aux,
            mensaje: response.mensaje})})
        .catch((error) => (console.log(error)))

    }

    renderContent = () =>{
        
        let options = this.fillSelect(this.state.capitulos);
        console.log(options)
        let mensaje = this.state.mensaje
        let form;
        if(this.state.capitulos.length == 0){
            mensaje = <h1>No hay capitulos para este libro</h1>
            form = <div></div>
        }else{
           form = (<form className="book_form" allign='center' onSubmit={this.handleSubmit}>
            
           <fieldset className="create_field">
               <label htmlFor="">Capitulos: </label>
               <select name="capitulo" id="capitulo">
                   {options}
               </select>
           
           </fieldset>
           <input type="submit" className="resetButton" value="Eliminar"/>
       </form>)
        }
        
        return(
            <div>
            {mensaje}
            {form}
            </div>
        )
    }
    
}

export default BajaCapitulo;