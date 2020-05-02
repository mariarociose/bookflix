import React from 'react';
import {Router,Link} from "react-router-dom";
import './App.css';
import AlbumContainer from "./components/AlbumContainer";
import Login from "./components/Login";
import {Route} from "react-router-dom"
import Detail from "./components/Detail";


function App() {
  return (
    <div className="App">
          <Route exact path="/" component={AlbumContainer}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/detail/:id" component={Detail}></Route>
    </div>
  );
}

export default App;
