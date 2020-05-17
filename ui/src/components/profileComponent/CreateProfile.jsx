import React from "react";
import ReactDOM from "react-dom";

import Cookie from "js-cookie";
import AvatarLogo from "../../img/avatar.png";
import CommonDisplay from "../CommonDisplay";


class CreateProfile extends CommonDisplay{
      constructor(props){
          super(props);
          console.log(this.props)
          this.state = {
              datos: "",
              numero: ""
          }

          this.handleChange = this.handleChange.bind(this);

      }
      componentDidMount(){
      
      }
      

      handleChange(e) {
        console.log("LAPPPUTTTTTTTTTTTTTAAAAAAAA")
        const entrada=e.target.card.value;
        let cant=0;
        for(let x=0; x<entrada.length;x++)
          if (entrada[x]==='0' || entrada[x]==='1')
            cant++;
        if (cant===entrada.length)
          this.setState( {
            numero: entrada
          })
        }
      

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
                  
                    alert('A name was submitted: ' );

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
                            <label htmlFor="nombre">Nombre</label>
                            <input required minLength = "4"  type="text" id="nombre"  name="nombre"/> 
                            
                            <label htmlFor="lastname"> Apellido: </label>
                            <input required minLength = "4" type="text" id="apellido" name="apellido" />
                            
                            <label htmlFor="email"> Email:</label>
                            <input required minLength = "6" type="text" id="email" name="email" />

                            <label htmlFor="card"> Tarjeta</label>
                            <input required minLength = "16" maxLength = "16" 
                            type="text" id="card" name="card" 
                            value={this.state.numero} onChange={this.handleChange}
                            />

                            <label for="cardCod"> Código Tarjeta</label>
                            <input required minLength = "3" maxLength = "3" type="text" id="cardCod" name="cardCod" />
                            
                            <label for="password"> Constraseña:</label>
                            <input required minLength = "6" type="password" id="password" name="password" />
                            
                            <label for="password2"> Repetir Constraseña:</label>
                            <input required minLength = "6" type="password" id="password2" name="password2" />

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
export default CreateProfile;
