import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (min-width: 320px) {
      
        background: #f7dbd3 0.65;
        box-shadow: inset 5px 5px 10px #d4bcb5, inset -5px -5px 10px #fffaf1;
        position: relative;
       
      }
`;

const PopularProducts = () => {
    return (
        <Container>
            {popularProducts.map((item) => (
                <Product item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default PopularProducts;