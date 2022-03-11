import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import donar_objeto from  '../Img/donar_objetos2.gif';
import comprar_tienda from  '../Img/comprar_tienda.gif';
import donar_dinero from  '../Img/donar_dinero.gif';
import donarObjetos from  '../Img/donarObjetos.png';
import donarDinero from  '../Img/donaDinero.png';
import compraTienda2 from  '../Img/compraTienda2.png';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  Align-items: center;
`;
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    Align-items: center;
    width:340px;
    padding: 15px;
    margin: 10px;

    border-radius: 7px;
    background: #f7dbd3 0.65;
    box-shadow: inset 5px 5px 10px #d4bcb5,
                inset -5px -5px 10px #fffaf1;
    position: relative;
                      
  ${mobile({ height: "20vh" })}
`;

const linkStyle = {
display: "flex",
flexDirection: "column",
flexWrap: "wrap",
justifyContent: "center",
alignItems: "center",

  borderRadius: "50%",
  cursor: "pointer",
};

const Image = styled.img`
width: 100px;
height: 100px;
`;
const ImageG = styled.img`
width: 100%;
// height: 100px;
`;

const ContTitle = styled.div`
  border: 0.5px solid #dbd3f7 ;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;

`;

const Title = styled.h1`
    color:#8aa290;
    // margin-bottom: 20px;
    padding: 10px;
    // transition: all 0.3s ease;
    
`;

const P = styled.p`
    color:#8aa290;
    font-size: 16px;
    
`;

 const onClickButton = (e) => {
  window.scrollTo(0, 0)
 };

const Categories = () => {
  return (
    <Div>
      <ContTitle>
        <Title>¿Como colaborar?</Title>
      </ContTitle>
      <Container>
          <Card>
             <Title>Dona Procutos</Title>
             <ImageG src= {donarObjetos} />
             <P>Sacale una foto, llena el formulario y dona un producto. Luego de chequear que este en condiciones, lo subiremos a la tienda On-Line para ser vendido y con el dinero de la venta poder ayudar a las causas feneficas.</P>
               <Link style={linkStyle} onClick={onClickButton} to='/'>
                 <Image src= {donar_objeto} />
                 <P>Colaborar</P> 
               </Link>       
          </Card>
          <Card>
            <Title>Compra en la tienda</Title>
            <ImageG src= {compraTienda2} />
            <P>Al comprar, todo el dinero de esa compra sera destinado una obra benefica</P>
            <Link style={linkStyle} onClick={onClickButton} to='/products'>
              <Image src= {comprar_tienda}/> 
              <P>Colaborar</P> 
            </Link>
          </Card>
          <Card>  
            <Title>Dona dinero</Title>
            <ImageG src= {donarDinero} />
            <P>Ayudanos a ayudar con tu donacion, el monto que desee sera bien rea bine recibido</P>
            <Link style={linkStyle} onClick={onClickButton} to='/'>
              <Image src= {donar_dinero}/>
              <P>Colaborar</P> 
            </Link>
          </Card>
       </Container>
     </Div>


    // <Container>
    //   {categories.map((item) => (
    //     <CategoryItem item={item} key={item.id} />
    //   ))}
    // </Container>
  );
};

export default Categories;
