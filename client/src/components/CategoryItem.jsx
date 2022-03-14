import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
    color:#f7dbd3;
    margin-bottom: 20px;
    
`;

const Button = styled.button`
    border:none;
    padding: 6px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    border: 0.5px solid lightgray
`;

const onClickButton = (e) => {
    window.scrollTo(0, 0)
}

const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                {
                    item.id === 3 ?
                        <Link to='/products'>
                            <Button onClick={onClickButton}>Colaborar</Button>
                        </Link>
                        : item.id === 2 ? <Link to='/donateproduct'>
                        <Button onClick={onClickButton}>Colaborar</Button>
                    </Link> 
                      : item.id === 1 ?
                       <Link to='/donatedinero'>
                    <Button onClick={onClickButton}>Colaborar</Button>
                </Link> : <Button>Colaborar</Button>
                }
            </Info>
        </Container>
    );
};

export default CategoryItem;
