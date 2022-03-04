import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './Page/Home'
import Register from './Page/Register'
import Login from './Page/Login'



function App() {
    return (
        <Router>

            <div className={"App"}>
                <Routes>
                    <Route exact path='/home' element={<Home />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/login' element={<Login />}/>

                </Routes>
            </div>
        </Router>
    );
}
export default App;