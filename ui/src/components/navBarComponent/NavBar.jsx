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

    redirectToLibrosAdmView = () => {
        this.props.history.push("/libros");
    }

    redirectToNovedadesAdmView = () => {
        this.props.history.push("/novedadesAdmin")
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
        if(Cookie.get("token") != null){
            if(Cookie.get("userType") == 2){
                botonDeLibros = <li><a href="#" onClick={this.redirectToLibrosAdmView}>Libros</a></li>
                botonDeNovedades = <li><Link to="/novedadesAdmin">Novedades</Link></li>
            }else{
                botonDeLibros = null
                botonDeNovedades = null
            }
        }

        return(

            <header>
                <p>Bookflix</p>
                <nav>
                    <ul className="navLink">
                        <li><a href="#">Contenido</a></li>
                        {botonDeLibros}
                        {botonDeNovedades}
                    </ul>



                </nav>
                <button className="cta" onClick={this.state.redirectFunction}>{this.state.buttonText}</button>
            </header>
        )
    }



}

export default withRouter(NavBar);
