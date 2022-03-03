import './App.css';
import { getAllTemperaments, getAllBreeds, setBreeds, setTemperaments} from "./actions";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import Create from './components/Create'
import Detail from './components/Detail.jsx';
import Contact from './components/Contact';
// import React , {useState, useEffect}from 'react';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        {/* <h1>Dogs</h1>
        <h4>In all shapes and sizes!</h4> */}
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/newbreed' component={Create} />
          <Route path='/breed/:id'  component={Detail} />
          <Route path='/contact'  component={Contact} />
        </Switch>
        {/* <footer>Coded by Euclides Ignacio</footer> */}
      </div>

    </BrowserRouter>  
  );
}

export default App;
