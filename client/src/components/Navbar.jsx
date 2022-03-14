import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getUserStatus, logoutUser, searchProducts } from '../store/actions';
import LogoHyho from '..//Img/logoLargo.gif';

const Container = styled.div`
  height: 80px; 
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  background-color: #f7dbd3;
  padding: 3px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: 60%;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 20px;

  margin-left: 5px;

  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  margin-right: 10px;
  text-decoration: none;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const ImgLogo = styled.img`
  width: auto;
  height: 15px;
  padding: 4px ;
  margin-left: 80px;
  alt= "logo no disponible"
${mobile({ fontSize: "24px" })}
`;

const linkStyle = {
    textDecoration: "none",
    color: 'inherit',
}

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("")
    const cartProducts = useSelector(state => state.shoppingCart)
    const userStatus = useSelector(state => state.userIsLogin)


    useEffect(() => {
        dispatch(getProducts())
        console.log("Lo de abajo muestra si el usuario esta logueado")
        dispatch(getUserStatus())
    }, [])

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartProducts))
    }, [cartProducts])

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchProducts(search))
        setSearch("")
        if (search) navigate('/products')
    }

    const onClickLogout = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
        dispatch(getUserStatus())
        window.location.reload(true)
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to='/' style={linkStyle}>
                        <h1> TU.ong </h1>
                    </Link>
                    <ImgLogo src={LogoHyho}></ImgLogo>
                    {/* <Slogan> "Help Yourself By Helping Others" </Slogan> */}
                </Left>
                <Center>
                    <SearchContainer onSubmit={handleSearch}>
                        <Input onChange={onChangeSearch} value={search} placeholder="Buscar..." />
                        <Search style={{ color: "gray", fontSize: 20 }} />
                    </SearchContainer>
                </Center>

                {userStatus ? <Right>
                    <MenuItem onClick={onClickLogout}>Cerrar Sesion</MenuItem>
                    <MenuItem>
                        <Link to='/cart' style={linkStyle}>
                            <Badge badgeContent={cartProducts.length} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </Link>
                    </MenuItem>
                </Right>
                    :
                    <Right>
                        <Link to='/register' style={linkStyle}>
                            <MenuItem>Registrarse</MenuItem>
                        </Link>
                        <Link to='/login' style={linkStyle}>
                            <MenuItem>Iniciar Sesion</MenuItem>
                        </Link>
                        <MenuItem>
                            <Link to='/cart' style={linkStyle}>
                                <Badge badgeContent={cartProducts.length} color="primary">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </Link>
                        </MenuItem>
                    </Right>

                }

            </Wrapper>
        </Container>
    );
};

export default Navbar;