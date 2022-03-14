import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCartDB } from "../store/actions";

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
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
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

const Cart = () => {
    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.shoppingCart)
    let subTotal = 0;
    cartProducts.forEach(el => subTotal += el.price)


    const onClickProduct = (e) => {
        // Para sumar y restar productos, en desarrollo

    }


    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>TUS COSAS</Title>
                <Top>
                    <Link to='/' style={linkStyle}>
                        <TopButton>CONTINUAR COMPRANDO</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Lista de Deseados (0)</TopText>
                    </TopTexts>
                </Top>
                <Bottom>
                    <Info>
                        {cartProducts.length ? cartProducts.map(el => (
                            <Product key={el.id}>
                                <ProductDetail>
                                    <Image src={el.image} />
                                    <Details>
                                        <ProductName>
                                            <b>Producto:</b>  {el.fullname}
                                        </ProductName>
                                        <ProductId>
                                            <b>Stock:</b> {el.stock}
                                        </ProductId>

                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add name={el.id} value='+' onClick={onClickProduct} />
                                        <ProductAmount>2</ProductAmount>
                                        <Remove name={el.id} value='-' onClick={onClickProduct} />
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {el.price}</ProductPrice>
                                </PriceDetail>
                                <Hr />
                            </Product>
                        )) : "No hay productos en el carrito"}

                    </Info>
                    <Summary>
                        <SummaryTitle>RESUMEN</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {subTotal}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            {/* <SummaryItemText>Descuento</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice> */}
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {subTotal}</SummaryItemPrice>
                        </SummaryItem>
                        <Button>COMPRAR</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Cart;
