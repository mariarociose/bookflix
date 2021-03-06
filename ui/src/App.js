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
import DisplayTrailer from "./components/displayTrailer/displayTrailer";
import VistaTrailer from "./components/vistaTrailer/vistaTrailer";
import Agregar_favorito from "./components/favoritos/agregar_favorito";
import Quitar_favorito from "./components/favoritos/quitar_favorito";
import Ranking_libros from "./components/ranking_leidos/ranking_leidos";
import Usuarios_fecha from "./components/usuariosAdminView1/usuarios_fecha";
import FileSelector from "./components/profileSelector/profileSelector"
import ProfileSelector from './components/profileSelector/profileSelector';
import ComentariosAdmin from './components/comentariosAdminView/comentariosAdmin';
import ChangeSuscription from "./components/changeSuscription/changeSuscription";
import NewProfile from "./components/newProfile/newProfile";
import EditProfile from "./components/modificarPerfil/modificarPerfil";
import LoginVisitante from "./components/loginComponent/LoginVisitante";
import LibroFavContainer from "./components/favoritosUser/favoritosUser";
import Quitar_favorito_fav from "./components/favoritos/quitar_favorito_fav";
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
            <Route exact path="/displayTrailer" component={DisplayTrailer}></Route>
            <Route exact path = "/vistaTrailer" component={VistaTrailer}></Route>
            <Route exact path = "/agregar_favorito" component={Agregar_favorito}></Route>
            <Route exact path = "/quitar_favorito" component={Quitar_favorito}></Route>

            <Route exact path = "/ranking_libros" component={Ranking_libros}></Route>
              <Route exact path = "/usuarios_fecha" component={Usuarios_fecha}></Route>

            <Route exact path= "/profileSelector" component={ProfileSelector}></Route>

            <Route exact path= "/validacionComentarios" component={ComentariosAdmin}></Route>

            <Route exact path="/changeSuscription/:ss" component={ChangeSuscription}></Route>
            <Route exact path="/newProfile" component={NewProfile}></Route>
            <Route exact path="/editarPerfil" component={EditProfile}></Route>
            <Route exact path="/loginVisitante" component={LoginVisitante}></Route>
            <Route exact path="/misFavoritos" component={LibroFavContainer}></Route>
              <Route exact path = "/quitar_favorito_fav" component={Quitar_favorito_fav}></Route>
          </Switch>
    </div>
  );
}

export default App;
