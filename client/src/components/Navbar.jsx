import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getProducts, searchProducts } from '../store/actions';
import LogoHyho from '../logoLargo.gif';

const Container = styled.div`
  height: 70px;
  
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  background-color: #f7dbd3;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
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
  text-decoration: none;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const ImgLogo = styled.img`
  width= auto;
  height= 20px;
  padding: 5px ;
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

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchProducts(search))
        setSearch("")
        if(search) navigate('/products')
    }

    return (
        <Container>
            <Wrapper> 
                <Left>
                    <SearchContainer onSubmit={handleSearch}>
                        <Input onChange={onChangeSearch} value={search} placeholder="Buscar..." />
                        <Search style={{ color: "gray", fontSize: 20 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to='/' style={linkStyle}>
                        <ImgLogo src={LogoHyho}></ImgLogo>
                    </Link>
                </Center>
                <Right>
                    <Link to='/register' style={linkStyle}>
                        <MenuItem>Registrarse</MenuItem>
                    </Link>
                    <Link to='/login' style={linkStyle}>
                        <MenuItem>Iniciar Sesion</MenuItem>
                    </Link>
                    <MenuItem>
                        <Link to='/cart' style={linkStyle}>
                            <Badge badgeContent={4} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </Link>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
