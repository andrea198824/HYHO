import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LadingPage from './components/LadingPage'

//App.js
// Desde donde se organiza la aplicación
// Falta poner el resto de las rutas a cada componente y logo si llevaria.

function App() {
    return (
        <Router>
            <div className={"App"}>
                <Routes>
                    <Route exact path='/' element={<LadingPage />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
