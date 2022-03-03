import { useState } from "react";
import { Link } from 'react-router-dom'


const NavBar = () => {
    const [search, setSearch] = useState("")


    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault()
        // Aqui se hace el dispatch
    }

    return (
        <nav>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="404 Not Found" /> 
            <form onSubmit={handleSubmitSearch}>
                <input type="text" value={search} placeholder="Buscar Producto..." onChange={onChangeSearch} ></input>
                <button>Buscar</button>
            </form>
            <Link to='/login'>
                <button> Login/Registrarse </button>
            </Link>
            <Link to='/logout'>
                <button> Logout </button>
            </Link>
            <input type="image" src="https://w7.pngwing.com/pngs/618/1013/png-transparent-shopping-cart-online-shopping-empty-cart-angle-logo-shopping-centre.png" alt="404 Not Found" />
        </nav>
    )
}

export default NavBar;