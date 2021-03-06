import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import Landing from "./pages/landing/Landing";
import NewProduct from "./pages/newProduct/NewProduct";
import FormDonaciones from "./pages/formDonaciones/FormDonaciones";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';
import { getToken, getUsers, getProducts, getCategories, getOrder } from './store/actions';
import DonarProduct from "./pages/DonarProduct/DonarProduct";
import Pyments from "./pages/pyments/Pyments";
import Newsletter from "./pages/newsletter/Newsletter";


function App() {

    const dispatch = useDispatch();
    const { getAccessTokenSilently, isLoading } = useAuth0();

    if (!isLoading) {
        getAccessTokenSilently()
            .then(res => {
                dispatch(getToken(res))
                setTimeout(() => {
                    dispatch(getUsers(res))
                    dispatch(getProducts(res))
                    dispatch(getCategories(res))
                    dispatch(getOrder(res))
                }, 2000)
            })
    }

    const token = useSelector(state => state.token);
    console.log("Este es el token: ", token);

    return (
        <div>
            <Router>
                <Topbar />
                <div className="container">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={token ? <Home /> : <Landing />} />
                        <Route exact path="/landing" element={<Landing />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/user/:userId" element={<User />} />
                        <Route path="/newUser" element={<NewUser />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:productId" element={<Product />} />
                        <Route path="/newProduct" element={<NewProduct />} />
                        <Route path="/ventas" element={<Pyments />} />
                        <Route path="/newsletter" element={<Newsletter />} />
                        <Route path="/formDonaciones" element={<FormDonaciones />} />
                        <Route path="/productos-donados" element={<DonarProduct />}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}


export default App;
