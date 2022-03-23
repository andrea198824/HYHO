import { Add, Remove } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { getDetails, modifyQuantityDetails, addToCartFromDetails } from '../store/actions';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;



const Image = styled.img`
  max-width: 80%;
  max-height: 90vh;
  min-height: 50vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const Stock = styled.h1`
  font-weight: 100;
  font-size: 30px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const product = useSelector(state => state.details)
    const allProducts = useSelector(state => state.products)

    useEffect(() => {
        if (allProducts.length) dispatch(getDetails(id))
    }, [])

    if (!allProducts.length) {
        setTimeout(() => {
            dispatch(getDetails(id))
        }, 2000)
    }



    // dispatch(getDetails(id))
    const onClickAddCart = (e) => {
        dispatch(addToCartFromDetails(product))
        alert("Producto Añadido")
    }

    const onClickQuantity = (e) => {
        dispatch(modifyQuantityDetails(e.currentTarget.getAttribute('value')))
    }

    return (
        <Container >
            <Navbar />
            <Announcement />
            {
                product && product.id
                    ? <Wrapper>
                        <ImgContainer>
                            <Image src={product ? product.image : 'https://acegif.com/wp-content/uploads/loading-53.gif'} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{product && product.title}</Title>
                            <Desc>
                                {product && product.descriptions}
                            </Desc>
                            <Price>$ {product && product.price}</Price>
                            <br />
                            <br /> { /* Utilizo br porque por algun motivo marginBottom no esta funcionando */}
                            <Stock>Stock: {product && product.stock}</Stock>
                            <FilterContainer>
                            </FilterContainer>
                            <AddContainer>
                                <AmountContainer>
                                    {
                                        product && product.quantity - 1 !== 0
                                            ?
                                            <Remove value='-' onClick={onClickQuantity} />
                                            :
                                            <Remove style={{ visibility: "hidden" }} />
                                    }
                                    {
                                        product && product.stock === 1 ?
                                            null
                                            :
                                            <Amount>{product && product.quantity}</Amount>
                                    }
                                    {
                                        product && product.quantity < product.stock ?
                                            <Add value='+' onClick={onClickQuantity} />
                                            :
                                            <Add style={{ visibility: "hidden" }} />
                                    }
                                </AmountContainer>
                                <Button onClick={onClickAddCart}> AGREGAR AL CARRITO </Button>
                            </AddContainer>
                        </InfoContainer>
                    </Wrapper>

                    : <ImgContainer>
                        <Image src='https://acegif.com/wp-content/uploads/loading-53.gif'></Image>
                    </ImgContainer>
            }

            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;
