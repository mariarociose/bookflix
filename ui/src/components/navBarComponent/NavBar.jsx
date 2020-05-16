import React from "react";
import ReactDOM from "react-dom";
import Cookie from "js-cookie";
import {deleteAllCookies} from "../../js/functions";
import {withRouter, Link} from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            buttonText: "Iniciar Sesion",
            redirectFunction: this.redirectToLoginForm
        }

    }

    deleteCookiesAndRedirectToHome = () => {

        deleteAllCookies();
        this.setState({buttonText: "Iniciar Sesion", redirectFunction: this.redirectToLoginForm})
        this.props.history.push("/");


    }

    redirectToLoginForm = () => {
        this.props.history.push("/login");
    }

    
    redirectToProfile = () => {
        this.props.history.push("/profile");
    }

    redirectToLibrosAdmView = () => {
        this.props.history.push("/libros");
    }

    redirectToNovedadesAdmView = () => {
        this.props.history.push("/novedadesAdmin")
    }

    redirectToHome = () => {
      if(Cookie.get("token") != null){
          if(Cookie.get("userType") == 2)
                  this.props.history.push("/homeAdmin")
          else {
              this.props.history.push("/home")
          }
        }
    }

    componentDidMount(){
        if(Cookie.get("token") != null){
            this.setState({buttonText : "Cerrar Sesion", redirectFunction: this.deleteCookiesAndRedirectToHome})

        }else{
            this.setState({buttonText: "Iniciar Sesion", redirectFunction: this.redirectToLoginForm});
        }
    }

//Los a anchor se deben reemplazar luego por links de React router.
//Son un mero placeholder
    render(){
        let botonDeLibros;
        let botonDeNovedades;
        let botonMisDatos;
        if(Cookie.get("token") != null){
            if(Cookie.get("userType") == 2){
                botonDeLibros = <li><a href="#" onClick={this.redirectToLibrosAdmView}>Libros</a></li>
                botonDeNovedades = <li><Link to="/novedadesAdmin">Novedades</Link></li>
            }else{
                botonDeLibros = null
                botonDeNovedades = null
                botonMisDatos = <li><a href="#" onClick={this.redirectToProfile}>Mis Datos</a></li>
            }
        }

        return(

            <header>
                <p>Bookflix</p>
                <nav>
                    <ul className="navLink">
                        <li><a href="#" onClick= {this.redirectToHome}>Inicio</a></li>
                        {botonDeLibros}
                        {botonDeNovedades}
                        {botonMisDatos}
                    </ul>



                </nav>
                <button className="cta" onClick={this.state.redirectFunction}>{this.state.buttonText}</button>
            </header>
        )
    }



}

export default withRouter(NavBar);
