import {useAuth0 } from '@auth0/auth0-react';
import "./landing.css";
import Logo from "../../logoLargo.gif";

const Landing = () => {
    const {loginWithRedirect} = useAuth0();
  return (
    <div className="cnt">
      <h1>Bienvenidos a el Panel Admin de TU.ong</h1>
      <img src={Logo} alt= ""/>
      <button className="loginButton" onClick={()=>loginWithRedirect()}>Logearse</button>
    </div>
  )
}

export default Landing
