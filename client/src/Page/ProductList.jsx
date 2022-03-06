import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { orderByPrice } from "../store/actions";


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
const dispatch = useDispatch()
const handleSelect = (e) =>{
    dispatch(orderByPrice(e.target.value))
  }
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>Destacados</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filtrar Productos:</FilterText>
                    <Select>
                        <Option disabled selected>
                            Categoria
                        </Option>
                        <Option>Electrodomesticos</Option>
                        <Option>Indumentaria</Option>
                        <Option>Vehiculos</Option>
                    </Select>
                    <Select>
                        <Option disabled selected>
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Ordenar:</FilterText>
                    <Select onChange={handleSelect}>
                        
                        <Option value="asc">Precio (asc)</Option>
                        <Option value="desc">Precio (desc)</Option>
                    </Select>
                    
                </Filter>
            </FilterContainer>
            <Products />
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default ProductList;

