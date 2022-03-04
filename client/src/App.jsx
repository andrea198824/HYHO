import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './Page/Home'



function App() {
    return (
        <Router>
            
            <div className={"App"}>             
                <Routes>                    
                        
                        <Route exact path='/home' element={<Home />} />                        
                                         
                </Routes>
            </div>
        </Router>
     );
}
export default App;