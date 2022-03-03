import { Link } from 'react-router-dom';

import landingStyle from "./Landing.module.css"

export default function Landing() {
console.log('aaaa',landingStyle)
console.log('holaaa')
  return (
    <div>
      <div >
        <div>
          <h1 className={landingStyle.textsContainer}>Contador</h1>
        </div>
        <div>
          <h3>About</h3>
        </div>
        <Link to="/home">
          <div >
            <button>Donar</button> // preg que opinan del botton que dirige a el home
          </div>
        </Link>
        <div>
          <h1>HYHO</h1>
        </div>
      </div>
    </div>
  );
}
