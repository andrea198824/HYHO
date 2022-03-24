import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import donar_objeto from '../Img/donar_objetos2.gif'
import comprar_tienda from '../Img/comprar_tienda.gif'
import donar_dinero from '../Img/donar_dinero.gif'
import donarObjetos from '../Img/donarObjetos.png'
import donarDinero from '../Img/donaDinero.png'
import compraTienda2 from '../Img/compraTienda2.png'


const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({
    padding: '0px',
    flexDirection: 'column'
  })} 
  @media (min-width: 360px) {
    flex-direction: column;
  }
  @media (min-width: 640px) {
    flex-direction: column;
  }
`
// ${mobile({ padding: '0px', flexDirection: 'column' })}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 320px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  padding: 12px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 25px;
  border-radius: 7px;
  background: #f7dbd3 0.65;
  box-shadow: inset 5px 5px 10px #d4bcb5, inset -5px -5px 10px #fffaf1;
  position: relative;

  ${mobile({ height: '20vh', flexDirection: 'column' })}

  @media (min-width: 320px) {
    flex-direction: column;
  }
`

const linkStyle = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '50%',
  cursor: 'pointer'
}

const Image = styled.img`
  width: 100px;
  height: 100px;
`
const ImageG = styled.img`
  height: 220px;
`

const Title = styled.h1`
  color: #8aa290;
  margin: 20px;
  margin-bottom: 30px;
  transition: all 0.3s ease;
`

const P = styled.p`
  color: #8aa290;
  font-size: 16px;
`

const onClickButton = e => {
  window.scrollTo(0, 0)
}

const Categories = () => {
  return (
    <Div>
      <Title>¿Como colaborar?</Title>
      <Container>
        <Card>
          <Title>Dona Productos</Title>
          <ImageG src={donarObjetos} />
          <P>
            Sacale una foto, llena el formulario y dona un producto. Luego de
            chequear que esté en condiciones, lo subiremos a la tienda On-Line
            para ser vendido y con el dinero de la venta poder ayudar a las
            causas benéficas.
          </P>
          <Link style={linkStyle} onClick={onClickButton} to='/donateproduct'>
            <Image src={donar_objeto} />
            <P>Colaborar</P>
          </Link>
        </Card>
        <Card>
          <Title>Compra en la Tienda</Title>
          <ImageG src={compraTienda2} />
          <P>
            Al comprar, todo el dinero de esa compra será destinado una obra
            benéfica
          </P>
          <Link style={linkStyle} onClick={onClickButton} to='/products'>
            <Image src={comprar_tienda} />
            <P>Colaborar</P>
          </Link>
        </Card>
        <Card>
          <Title>Dona Dinero</Title>
          <ImageG src={donarDinero} />
          <P>
            Ayúdanos a ayudar con tu donación, el monto que desee sera bien
            recibido
          </P>
          <Link style={linkStyle} onClick={onClickButton} to='/donatedinero'>
            <Image src={donar_dinero} />
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
  )
}

export default Categories
