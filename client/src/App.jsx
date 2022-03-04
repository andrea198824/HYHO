import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './Page/Home'
import Register from './Page/Register'
import Login from './Page/Login'
import Cart from './Page/Cart'

function App() {
    return (
            <div className={"App"}>
             <Router>
                <Switch>
                    <Route exact path='/' element={<Home />} />
                    <Route path="/products/:category" element={<ProductList />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route exact path='/cart' element={<Cart />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} />
                </Switch>
             </Router>
            </div>
    );
}
export default App;
