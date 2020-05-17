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

          fetch("http://localhost:4000/createProfile",{
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
                  this.props.history.push("/login");
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

        return(

          <div>
            <div className="create_form">
                  <h1> Nuevo usuario</h1>
                <form className="book_form" allign='center'  onSubmit={this.handleSubmit}>

                  <fieldset className="create_field">
                            <label for="nombre">Nombre</label>
                            <input type="text" id="nombre"  required  name="nombre"/> 
                            
                            <label for="lastname"> Apellido: </label>
                            <input type="text" id="apellido"  required name="apellido" />
                            
                            <label for="email"> Email:</label>
                            <input type="text" id="email"  required name="email" />
                            
                            <label for="password"> Constraseña:</label>
                            <input type="text" id="password"  required name="password" />
                            
                            <label for="password2"> Repetir Constraseña:</label>
                            <input type="text" id="password2"  required name="password2" />

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
