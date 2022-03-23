import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Page/Home';
import Product from "./Page/Product";
import ProductList from "./Page/ProductList";
//import Register from './Page/Register';
// import Login from './Page/Login';
import Cart from './Page/Cart';
import InfoSlider from './Page/InfoSlider';
import RecoverPassword from './Page/RecoverPassword';
import RegisterAdmin from './Page/RegiterAdmin';
import DonarProduct from './Page/DonarProduct';
import DonarDinero from './Page/DonarDinero';
import Mapa from './Page/Mapa';
import BuyFormPage from './Page/BuyFormPage'
import MercadoPago from './Page/mercadopago';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, concatShopCart, getCategories, getProducts, getShopCart, getToken } from './store/actions'
import { useAuth0 } from '@auth0/auth0-react';



function App() {
    const dispatch = useDispatch();
    const { user, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [])
    
    if (!isLoading) {
        getAccessTokenSilently()
        .then(res => {
            dispatch(getToken(res))
            dispatch(addUser(user, res))
            dispatch(getShopCart(user.email, res))
            setTimeout(()=> {
                dispatch(concatShopCart())
            }, 2000)
            })
    }

    return (
        <div className={"App"}>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route exact path='/cart' element={<Cart />} />
                    {/* <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} /> */}
                    <Route exact path='/infoSlider' element={<InfoSlider />} />
                    <Route exact path='/registeradmin' element={<RegisterAdmin />} />
                    <Route exact path='/recoverpassword' element={<RecoverPassword />} />
                    <Route exact path='/donateproduct' element={<DonarProduct />} />
                    <Route exact path='/donatedinero' element={<DonarDinero />} />
                    <Route exact path='/mapa' element={<Mapa />} />
                    <Route exact path='/buyformpage' element={<BuyFormPage />} />
                    <Route exact path='/mercadopago' element={<MercadoPago/>} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
