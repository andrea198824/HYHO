/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Product from "./Product";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Paged from "./Paged";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
    const products = useSelector(state => state.products)
    const filteredProducts = useSelector(state => state.filteredProducts)

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(6);
    const [order, setOrder] = useState('')

    const viewLastProducts = currentPage * productsPerPage;
    const viewFirstProducts = viewLastProducts - productsPerPage;
    const currentProducts = products.slice(viewFirstProducts, viewLastProducts)

    const paged = (PageNumber) => {
        setCurrentPage(PageNumber)
        window.scrollTo(0, 0)
    }

    return (
        <Div>
            <Container>
                {filteredProducts.length ? filteredProducts.map((item) => (<Product item={item} key={item.id} />))
                    :
                    currentProducts?.map((item) => (<Product item={item} key={item.id} />))
                }
            </Container>
            {filteredProducts.length ? <Paged productsPerPage={productsPerPage} products={filteredProducts.length} paged={paged} />
                :
                <Paged productsPerPage={productsPerPage} products={products.length} paged={paged} />
            }
        </Div>
    );
};

export default Products;