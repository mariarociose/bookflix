import React from 'react';
import {Router,Link} from "react-router-dom";
import './App.css';
import AlbumContainer from "./components/AlbumContainer";
import SignInSide from "./components/SignIn";
import {Route} from "react-router-dom"
import Detail from "./components/Detail";


function App() {
  return (
    <div className="App">
          <Route exact path="/" component={AlbumContainer}></Route>
          <Route exact path="/login" component={SignInSide}></Route>
          <Route exact path="/detail/:id" component={Detail}></Route>
    </div>
  );
}

export default App;
