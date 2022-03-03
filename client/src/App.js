import './App.css';
import { getAllTemperaments, getAllBreeds, setBreeds, setTemperaments} from "./actions";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import React , {useState, useEffect}from 'react';

function App() {

  return (
    <BrowserRouter>
      <div >
        <h1>Agregar rutas</h1>
        <Switch>
        </Switch>
      </div>

    </BrowserRouter>  
  );
}

export default App;
