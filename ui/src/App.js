import React from 'react';
import {Router,Link} from "react-router-dom";
import './App.css';
import AlbumContainer from "./components/AlbumContainer";
import Login from "./components/loginComponent/Login";
import {Route,Switch} from "react-router-dom"
import Detail from "./components/Detail";
import NavBar from "./components/navBarComponent/NavBar";
import StartComponent from "./components/startComponent/StartComponent";
import Libros from "./components/librosAdmView/Libros";
import Libro_new from  "./components/librosNewComponent/Libro_new";
import NovedadesContainer from "./components/novedadesContainerComponent/NovedadesContainer";
import Profile from "./components/profileComponent/Profile";
import DetalleNovedad from "./components/detalleNovedad/DetalleNovedad";

function App() {
  return (
    <div className="App">
          <Switch>
            
            <Route exact path="/" component={StartComponent}></Route>
            <Route exact path="/home" component={AlbumContainer}></Route>
            <Route exact path="/homeAdmin" component={AlbumContainer}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/detail/:id" component={Detail}></Route>
            <Route exact path="/libros" component={Libros}></Route>
            <Route exact path="/libro_new" component={Libro_new}></Route>
            <Route exact path="/novedadesAdmin" component={NovedadesContainer}></Route>
            <Route exact path="/detalleNovedad" component= {DetalleNovedad}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            
          </Switch>
    </div>
  );
}

export default App;
