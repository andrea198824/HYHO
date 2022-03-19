import { Add, Remove } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles'
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { modifyQuantity, deleteShopCart, deleteLocalShopCart, compareProductsShopCart } from "../store/actions";
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from "react";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  user-select: none;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  user-select: none;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const linkStyle = {
    textDecoration: "none",
    color: 'inherit',
}
const useStyles = makeStyles(theme => ({
    AddAndMinus: {
        "&:hover": { fontSize: "30px" },
        "transition": "0.2s ease",
        "cursor": "pointer"
    },
    Buttons: {
        "&:hover": { fontSize: "15px", textDecoration: "underline" },
        "transition": "0.2s ease",
        "cursor": "pointer"
    }
}))

const Cart = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const cartProducts = useSelector(state => state.shoppingCart)
    let subTotal = 0;
    cartProducts.forEach(el => subTotal += el.price * el.quantity)
    const classes = useStyles();
    const { user, isLoading } = useAuth0()
    const token = useSelector(state => state.token)

    useEffect(() => {
        if (products.length > 1) {
            dispatch(compareProductsShopCart())
        }
    }, [products])


    const onClickProduct = (e) => {
        dispatch(modifyQuantity(e.currentTarget.getAttribute('id'), e.currentTarget.getAttribute('value')))
    }

    const onClickDeleteCart = (e) => {
        if (user && !isLoading && window.confirm("Esto eliminara tu carrito tanto localmente como de la nube. Deseas proseguir?")) {
            dispatch(deleteShopCart(user.email, token))
        }
        if (!user && !isLoading && window.confirm("Esto solo eliminara tu carrito localmente, si deseas eliminarlo de la nube requieres tener una sesion iniciada. Deseas proseguir? ")) {
            dispatch(deleteLocalShopCart())
        }
    }


    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>TUS COSAS</Title>
                <Top>
                    <Link to='/products' style={linkStyle}>
                        <TopButton className={classes.Buttons}>CONTINUAR COMPRANDO</TopButton>
                    </Link>
                    {isLoading
                        ? <TopButton style={{ visibility: "hidden" }} />
                        : <TopButton className={classes.Buttons} onClick={onClickDeleteCart}>LIMPIAR CARRITO</TopButton>
                    }
                    {/* <TopTexts>
                        <TopText>Lista de Deseados</TopText>
                    </TopTexts> */}
                </Top>
                <Bottom>
                    <Info>
                        {cartProducts.length ? cartProducts.map(el => (
                            <Product key={el.id}>
                                <ProductDetail>
                                    <Image src={el.image} />
                                    <Details>
                                        <ProductName>
                                            <b>Producto:</b>  {el.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>Stock:</b> {el.stock}
                                        </ProductId>

                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        {
                                            el.quantity < el.stock ?
                                                <Add className={classes.AddAndMinus} id={el.id} value='+' onClick={onClickProduct} />
                                                :
                                                <Add style={{ visibility: "hidden" }} />
                                        }
                                        <ProductAmount>{el.quantity}</ProductAmount>
                                        {
                                            el.quantity - 1 !== 0 ?
                                                <Remove className={classes.AddAndMinus} id={el.id} value='-' onClick={onClickProduct} />
                                                :
                                                <Remove style={{ visibility: "hidden" }} />
                                        }
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {el.price * el.quantity}</ProductPrice>
                                </PriceDetail>
                                <Hr />
                            </Product>
                        )) : <Title > Sin Productos  </Title>}

                    </Info>
                    <Summary>
                        <SummaryTitle>RESUMEN</SummaryTitle>
                        {
                            subTotal === 0
                                ? <SummaryItem style={{ visibility: "hidden" }} />
                                : <SummaryItem>
                                    <SummaryItemText>Subtotal</SummaryItemText>
                                    <SummaryItemPrice>$ {subTotal}</SummaryItemPrice>
                                </SummaryItem>
                        }
                        {/* <SummaryItem>
                            {/* <SummaryItemText>Descuento</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice> */}
                        {/* </SummaryItem> */}
                        {
                            subTotal === 0
                                ? <SummaryItem style={{ visibility: "hidden" }} />
                                : <SummaryItem type="total">
                                    <SummaryItemText>Total</SummaryItemText>
                                    <SummaryItemPrice>$ {subTotal}</SummaryItemPrice>
                                </SummaryItem>
                        }
                        {
                            isLoading
                                ? null
                                : user
                                    ? <Button className={classes.Buttons}>COMPRAR</Button>
                                    : subTotal === 0
                                        ? <Title style={{ fontSize: "25px" }}> Agrega Productos Para Continuar </Title>
                                        : <Title> Inicia Sesion Para Continuar </Title>
                        }
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Cart;
