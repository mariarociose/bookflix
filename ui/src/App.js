import React from 'react';
import {Router,Link} from "react-router-dom";
import './App.css';
import Login from "./components/loginComponent/Login";
import {Route,Switch} from "react-router-dom"
import Detail from "./components/Detail";
import NavBar from "./components/navBarComponent/NavBar";
import StartComponent from "./components/startComponent/StartComponent";
import Libros from "./components/librosAdmView/Libros";
import Libro_new from  "./components/librosNewComponent/Libro_new";
import NovedadesContainer from "./components/novedadesContainerComponent/NovedadesContainer";
import Profile from "./components/profileComponent/Profile";
import Editprofile from "./components/profileComponent/Editprofile";
import DetalleNovedad from "./components/detalleNovedad/DetalleNovedad";
import Libro_detail from "./components/libroViewDetail/Libro_detail";
import EditorialCreate from "./components/editorialCreate/EditorialCreate";
import GeneroCreate from "./components/generoCreate/GeneroCreate";
import AutorCreate from "./components/autorCreate/AutorCreate";
import AltaNovedad from "./components/altaNovedad/AltaNovedad";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome"
import CreateProfile from "./components/profileComponent/CreateProfile";
import Trailer from "./components/trailerComponent/Trailer";
import DetalleTrailer from "./components/trailerComponent/detalleTrailer"
import TrailersContainer from "./components/trailerComponent/trailersContainer";
import PDFDisplay from "./components/pdfDisplay/displayPdf";
import AltaCapitulo from "./components/altaCapitulo/AltaCapitulo";
import AltaTrailer from "./components/altaTrailer/AltaTrailer";
import AltaTrailerLibre from "./components/altaTrailer/AltaTrailerLibre";
import Trailers from "./components/trailersAdminView/trailers";
import LibroContainer from "./components/librosUserView/librosUserView";
import Libro_detail_user from "./components/libroViewDetailUser/Libro_detail_user";
import Historial_Lectura from "./components/historialComponent/Historial_Lectura";
import BajaCapitulo from "./components/bajaCapitulo/bajaCapitulo";

function App() {
  return (
    <div className="App">
          <Switch>
            <Route exact path="/" component={StartComponent}></Route>
            <Route exact path="/home" component={UserHome}></Route>
            <Route exact path="/homeAdmin" component={AdminHome}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/detail/:id" component={Detail}></Route>
            <Route exact path="/libros" component={Libros}></Route>
            <Route exact path="/libro_new" component={Libro_new}></Route>
            <Route exact path="/novedadesAdmin" component={NovedadesContainer}></Route>
            <Route exact path="/detalleNovedad" component= {DetalleNovedad}></Route>
            <Route exact path="/altaNovedad" component={AltaNovedad}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/libro_detail" component={Libro_detail}></Route>
            <Route exact path="/editprofile" component={Editprofile}></Route>
            <Route exact path="/createprofile" component={CreateProfile}></Route>
            <Route exact path="/createEditorial" component={EditorialCreate}></Route>
            <Route exact path="/createGenero" component={GeneroCreate}></Route>
            <Route exact path="/createAutor" component={AutorCreate}></Route>


            <Route exact path="/trailer" component={Trailer}></Route>
            <Route exact path="/trailersContainer" component={TrailersContainer}></Route>
            <Route exact path="/detalleTrailer" component={DetalleTrailer}></Route>

            <Route exact path="/altaCapitulo" component={AltaCapitulo}></Route>
            <Route exact path="/altaTrailer" component={AltaTrailer}></Route>
            <Route exact path="/altaTrailerLibre" component={AltaTrailerLibre}></Route>
            <Route exact path="/trailers" component={Trailers}></Route>
            <Route exact path="/librosUserView" component={LibroContainer}></Route>
            <Route exact path="/libro_detail_user" component={Libro_detail_user}></Route>
            <Route exact path="/capituloVista" component={PDFDisplay}></Route>
            <Route exact path="/historial_lectura" component={Historial_Lectura}></Route>
            <Route exact path="/bajaCapitulo" component={BajaCapitulo}></Route>

          </Switch>
    </div>
  );
}

export default App;
