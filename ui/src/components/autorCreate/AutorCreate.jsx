import React from "react";
import ReactDOM from "react-dom";

import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png";
import CommonDisplay from "../CommonDisplay";


class AutorCreate extends CommonDisplay{



      constructor(props){
          super(props);
          console.log(this.props)
          this.state = {
              datos: {}
          }
      }


      componentDidMount(){}

      getData = (form) => (

          fetch("http://localhost:4000/autor_insert",{
              method: "POST",
              body: new FormData(form)
          }

        )
          .then((res) => (res.json()))
          .then((data) => {
              this.setState({datos:data}, () => (console.log(this.state.datos)))
          })

      )

      redirectOnCreatead = () => {


                  this.props.history.push("/createautor");
                }


      handleSubmit = (e) => {


                    e.preventDefault();
                    this.getData(e.target)
                     //retorna Promise, las promises las manejamos con then. Fetch tmb retorna promise
                    .then(() => {

                        this.redirectOnCreatead()

                    })

                    e.target.reset();

                }




      renderContent = () => {
        let mensaje = <p>{this.state.datos.mensaje} </p>
        return(

          <div>
            <div className="create_form">
                  <h1> Alta de Autor </h1>
                  {mensaje}
                <form className="book_form" allign='center'  onSubmit={this.handleSubmit}>

                  <fieldset className="create_field">


                    <label for="titulo">Nombre Autor:</label>
                    <input type="text" id="nombre"  required  name="nombre"/>

                    <label for="titulo">Apellido Autor:</label>
                    <input type="text" id="apellido"  required  name="apellido"/>


                    </fieldset>


                    <button type="submit" value="Guardar" class="saveButton" >
                      Guardar
                    </button>
                    <button type="reset" value="Cancelar" class="resetButton">
                    Cancelar
                    </button>

                    </form>


              </div>

            </div>

        )

      }




}
export default AutorCreate;
