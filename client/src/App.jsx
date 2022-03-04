import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Page/Home';
import Product from "./Page/Product";
import ProductList from "./Page/ProductList";
import Register from './Page/Register';
import Cart from './Page/Cart';
import Login from './Page/Login';

function App() {
    return (
            <div className={"App"}>
             <Router>
                <Switch>
                    <Route exact path='/' element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
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
