/* eslint-disable react-hooks/exhaustive-deps */
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useEffect} from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { putShopCart,  postShopCart } from '../store/actions';
import LogoHyho from '..//Img/logoLargo.gif';
import { useAuth0 } from "@auth0/auth0-react";

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

const profilePic = {
    width: "auto",
    height: "40px",
    padding: "4px",
    borderRadius: "2rem",

}

const Navbar = () => {
    const dispatch = useDispatch();

    const cartProducts = useSelector(state => state.shoppingCart)
    const token = useSelector(state => state.token)
    const { user, isLoading, loginWithRedirect, logout } = useAuth0();

    useEffect(() => {
        if (!isLoading && user) dispatch(postShopCart(user.email, cartProducts, token))
    }, [])

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartProducts))
        if (!isLoading && user) {
            dispatch(putShopCart(user.email, cartProducts, token))
        }
    }, [cartProducts])
    
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

                {
                    isLoading ?
                        <Right>
                            <MenuItem>Cargando...</MenuItem>
                            <MenuItem>
                                <Link to='/cart' style={linkStyle}>
                                    <Badge badgeContent={cartProducts.length} color="primary">
                                        <ShoppingCartOutlined />
                                    </Badge>
                                </Link>
                            </MenuItem>
                        </Right>
                        :
                        user ?
                            <Right>
                                <MenuItem onClick={() => logout({ returnTo: window.location.origin })} >Cerrar Sesion</MenuItem>
                                <img src={user.picture} style={profilePic} alt="" />
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
                                <MenuItem onClick={loginWithRedirect}>Iniciar Sesion / Registrarse</MenuItem>
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