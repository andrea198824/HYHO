import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './Page/Home';
import Product from "./Page/Product";
import ProductList from "./Page/ProductList";
import Register from './Page/Register';
import Cart from './Page/Cart';
import Login from './Page/Login';
import InfoSlider from './Page/InfoSlider';
import RecoverPassword from './Page/RecoverPassword';
import RegisterAdmin from './Page/RegiterAdmin';
import DonarProduct from './Page/DonarProduct';
import DonarDinero from './Page/DonarDinero';


function App() {
    return (
            <div className={"App"}>
             <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route exact path='/cart' element={<Cart />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/infoSlider' element={<InfoSlider />} />
                    <Route exact path='/registeradmin' element={<RegisterAdmin />} />
                    <Route exact path='/recoverpassword' element={<RecoverPassword />} />
                    <Route exact path='/donateproduct' element={<DonarProduct />} />
                    <Route exact path='/donatedinero' element={<DonarDinero />} />
                </Routes>
             </Router>
            </div>
    );
}
export default App;
