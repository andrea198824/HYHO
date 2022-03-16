import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Map,
  Twitter
} from '@material-ui/icons'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import mercadoPago from '../Img/mercadoPago.png'
import { requirePropFactory } from '@material-ui/core'

import Mapa from '../Page/Mapa'

const Container = styled.div`
  display: flex;
  background-color: #d3f7db;
  ${mobile({ flexDirection: 'column' })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const Logo = styled.h1``

const Desc = styled.p`
  margin: 20px 0px;
`

const SocialContainer = styled.div`
  display: flex;
`

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: 'none' })}
`

const Title = styled.h3`
  margin-bottom: 30px;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: '#fff8f8' })}
`

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const Payment = styled.img`
  width: 300px;
`

const linkListItems = {
  textDecoration: 'none',
  color: 'inherit',
  width: '50%'
}

const Footer = () => {
  const onClickLink = e => {
    window.scrollTo(0, 0)
  }

  return (
    <Container>
      <Left>
        <Logo>HYHO</Logo>
        <Desc>
          Nuevamente agradecemos su tiempo invertido al visitar nuestra app-web
          y su ganas de ayudar a construir juntos una sociedad mejor.
        </Desc>
        <SocialContainer>
          <SocialIcon color='3B5999'>
            <Facebook />
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <Instagram />
          </SocialIcon>
          <SocialIcon color='55ACEE'>
            <Twitter />
          </SocialIcon>
          <SocialIcon color='E60023'>
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Links directos</Title>
        <List>
          <Link onClick={onClickLink} to='/' style={linkListItems}>
            <ListItem>Home</ListItem>
          </Link>
          <Link onClick={onClickLink} to='/cart' style={linkListItems}>
            <ListItem>Carro de compras</ListItem>
          </Link>
          <ListItem>Dona dinero</ListItem>
          <ListItem>Dona productos</ListItem>
          <Link onClick={onClickLink} to='/products' style={linkListItems}>
            <ListItem>Tienda</ListItem>
          </Link>
          <ListItem>Mi cuenta</ListItem>
          <ListItem>Lista de deseos</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contacto</Title>
        <ContactItem>
          <Link onClick={onClickLink} to={'/Mapa'}>
            <Map
            // googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${credentials.apiKey}`}
            // containerElement = {<div style={{height: '400px'}}/>}
            // mapElement={<div style={{height: '100%'}}/>}
            // loadingElement = {<p>Loading...</p>}
            style={{ linkListItems }}
            />
          </Link>
          &nbsp; 101 margarita, CABA, Buenos Aires
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: '10px' }} /> +01 101 10 01
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: '10px' }} /> ayuda@hyho.com
        </ContactItem>
        <Payment src={mercadoPago} />
      </Right>
    </Container>
  )
}

export default Footer
