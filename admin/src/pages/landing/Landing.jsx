import {useAuth0 } from '@auth0/auth0-react';


const Landing = () => {
    const {loginWithRedirect} = useAuth0();
  return (
    <div>
    <img src=""/>
      <button onClick={loginWithRedirect}>Logearse</button>
    </div>
  )
}

export default Landing