import styled from "styled-components";
import Product from "./Product";
import { useSelector } from 'react-redux';


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
    const products = useSelector(state => state.products)
    const filteredProducts = useSelector(state => state.filteredProducts)
    return (
        <Container>

            {filteredProducts.length ? filteredProducts.map((item)=>(<Product item={item} key={item.id} />)) 
                :
                products.map((item) => (
                    <Product item={item} key={item.id} />
                ))
            }
        </Container>
    );
};

export default Products;