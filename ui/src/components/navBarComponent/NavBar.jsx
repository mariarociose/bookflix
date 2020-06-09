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

    redirectToCreateAutorView = () => {
        this.props.history.push("/createAutor")
    }

    redirectToCreateGeneroView = () => {
        this.props.history.push("/createGenero")
    }

    redirectToCreateEditorialView = () => {
        this.props.history.push("/createEditorial")
    }

    redirectToTrailer = () => {
        this.props.history.push("/trailersContainer");
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

    redirectToLibrosUserView = () => {
        this.props.history.push("/librosUserView")
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
        let botonCreateAutor;
        let botonCreateGenero;
        let botonCreateEditorial;
        let botonDeTrailer;
        let botonAltaCapitulo;
        let botonAltaTrailer;
        let botonTrailers;
        let botonLibrosUser;

        if(Cookie.get("token") != null){
            if(Cookie.get("userType") == 2){
                botonDeLibros = <li><a href="#" onClick={this.redirectToLibrosAdmView}>Libros</a></li>
                botonDeNovedades = <li><Link to="/novedadesAdmin">Novedades</Link></li>
                botonCreateAutor = <li><a href="#" onClick={this.redirectToCreateAutorView}>Autor</a></li>
                botonCreateGenero =<li><a href="#" onClick={this.redirectToCreateGeneroView}>Genero</a></li>
                botonCreateEditorial = <li><a href="#" onClick={this.redirectToCreateEditorialView}>Editorial</a></li>
                botonAltaCapitulo = <li> <Link to="/altaCapitulo">Alta Capitulo</Link>  </li>
                botonLibrosUser = null;

                botonTrailers = <li> <Link to="/trailers">Trailers</Link>  </li>
            }else{
                botonDeLibros = null
                botonDeNovedades = null
                botonMisDatos = <li><a href="#" onClick={this.redirectToProfile}>Mis Datos</a></li>
                botonDeTrailer = <li><a href="#" onClick={this.redirectToTrailer}>Trailers</a></li>
                botonAltaCapitulo = null;
                botonAltaTrailer = null;

                botonLibrosUser = <li><a href="#" onClick={this.redirectToLibrosUserView}>Libros!</a></li>
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
                        {botonCreateAutor}
                        {botonCreateGenero}
                        {botonCreateEditorial}
                        {botonMisDatos}
                        {botonDeTrailer}
                        {botonAltaCapitulo}
                        {botonAltaTrailer}
                        {botonTrailers}
                        {botonLibrosUser}
                    </ul>



                </nav>
                <button className="cta" onClick={this.state.redirectFunction}>{this.state.buttonText}</button>




            </header>


        )
    }



}

export default withRouter(NavBar);
