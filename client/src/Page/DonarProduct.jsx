
import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from "react-redux"
import FileBase from 'react-file-base64'
import NavBar from '../components/Navbar'
import { Height } from '@material-ui/icons'
import { donarProducto, getToken  } from '../store/actions'
import { useAuth0 } from '@auth0/auth0-react';
import Announcement from '../components/Announcement'

const Container = styled.div`
  width: 100vw;
  height: 82vh;
  background: linear-gradient(
      #d3f7db,
      #f7dbd3
    ),
    url("https://lavozdemotul.com/wp-content/uploads/2016/08/registration-page-background-504-1.png")
      center;
  background-size: cover;
  display: flex;
justify-content: center;
  align-items: center;
flex-direction: column;
  
`;

const Wrapper = styled.div`
  width: 40%;
  height: 380px;
  padding: 20px;
  background-color: white;
display: flex;
justify-content: center;
  align-items: center;
flex-direction: column;
  ${mobile({ width: "75%" })}
    
`;

const Title = styled.h1`
   padding-bottom: 20px;
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
   
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  border: none;
  padding: 15px 20px;
  
  background-color: #dbd3f7;
  color:#4d4442;
  cursor: pointer;
 &:disabled {
    background-color: gray;
    color: black;
    opacity: 0.7;
    cursor: default;
  }
`;

const Paragraph = styled.p`
  color: red;
  font-size: 10px;
  font-weight: 2;
`;

const DivItemUno = styled.div`
padding-top:80px;
 display:flex;
  justify-content: center;
  align-items: center;
 flex-direction: column;
  height: 15vh; /*Este valor lo puedes omitir si la altura de tu componente esta definida*/
`

const DivItemDos = styled.div`
  padding-top:55px;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:space-around;
  align-items:unset;
  align-content:flex-end;
  height: 20vh; /*Este valor lo puedes omitir si la altura de tu componente esta definida*/
`

const DivItemTres = styled.div`
 display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:space-around;
  align-items:unset;
  align-content:flex-start;
  height: 20vh; /*Este valor lo puedes omitir si la altura de tu componente esta definida*/
`

const Item0 = styled.input`
order:1;
  flex:0 1 center;
  align-self:flex-start;
  height:4vh;
  width:20vh;
  margin-top: 3vh;
`

const Item1 = styled.input`
order:2;
  flex:0 1 center;
  align-self:flex-start;
  height:5vh;
  width:25vh;
  margin-top: 3vh;
`

const linkStyle = {
    textDecoration: "none",
    color: 'inherit',
    width: '50%',
    padding: '5px'
}

const Input = styled.input`
`

export function validate (input) {
  let errors = {}
  console.log(input.title)
  if (!input.title) {
    errors.title = 'Nombre Es Requerido'
  } else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(input.title)) {
    console.log('entro al else if')
    errors.title = 'Nombre es Invalido'
  } else {
    delete errors.title
  }

  if (!input.description) {
    errors.description = 'Description is required'
  } else if (input.description.length < 10) {
    errors.description = 'Description must have at least 10 characters'
  } else {
    delete errors.description
  }

  if (!input.cantidad) {
    errors.cantidad = 'Amount is required'
  } else if (input.cantidad.length < 1) {
    errors.cantidad = 'Must have at least 1 Product'
  } else {
    delete errors.cantidad
  }
  if (!input.email) {
            errors.mail = 'Correo Requerido';
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            errors.mail = 'Correo Invalido';
        }

  if (Object.keys(errors).length <= 1) {
    errors.disabled = true
  } else {
    errors.disabled = false
  }

  return errors
}

const DonarProduct = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { email, getAccessTokenSilently, isLoading } = useAuth0();
  const token = useSelector( state => state.token)

  if (!isLoading) {
    getAccessTokenSilently()
        .then(res => {
            dispatch(getToken(res))              
        })
  
  }


  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    email: '',
    title: '',
    price:'',
    weight:'',
    image: '',
    descriptions: '',
    stock: '',
    category:[],


  })
  const getBaseFile = files => {
    setInput(prevState => ({ ...prevState, image: files.base64 }))
  }
  
  const handleInputChange = function (e) {
    e.preventDefault()

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    setErrors(
      validate({
        ...input, 
        [e.target.name]: e.target.value
      })
    )
  }

  const handleSubmit = e => {
    console.log('entro al submit', input)
    e.preventDefault()
    dispatch(donarProducto(input,email,token))
    alert("Gracias por tu Donacion")
    navigate("/")
}


  console.log(errors)

  return (
    <div>
      <NavBar />
      <Announcement/>

      <Container>
          <Title> Donar Producto</Title>
      
      <Wrapper>

          <Form onSubmit={handleSubmit}>
          <DivItemUno>
          <div>
                           <Item0
                                onChange={(e) => handleInputChange(e)}
                                type='email'
                                name='email'
                                placeholder="Correo"
                            />
                            {errors.mail && (
                                 <Paragraph>{errors.mail}</Paragraph>
                                
                            )}
                        </div>
            <div>
              <Item0
                onChange={e => handleInputChange(e)}
                type='text'
                name='title'
                placeholder='Nombre del Producto'
              />

            {errors.title && <Paragraph>{errors.title}</Paragraph>}
          </div>
          <div>
            <Item0
              onChange={e => handleInputChange(e)}
              type='number'
              name='cantidad'
              placeholder='Cantidad'
            />
            {errors.cantidad && <Paragraph>{errors.cantidad}</Paragraph>}
          </div>
          <div>
            <Item0
              onChange={e => handleInputChange(e)}
              type='text'
              name='descriptions'
              placeholder='Descripcion'
            />
            {errors.lastName && <Paragraph>{errors.descriptions}</Paragraph>}
          </div>
          </DivItemUno>
        
          <DivItemDos>
          <div >
          
            <FileBase type='file' multiple={false} onDone={getBaseFile} />

            {errors.image && <Paragraph>{errors.image}</Paragraph>}
          </div>
         
          
          <div>
              <Button type='submit' disabled={!errors.disabled}>
                Donar
              </Button>
            <Link to='/' >
              <Button>Volver</Button>
            </Link>
          </div>
          </DivItemDos>
        </Form>
      </Wrapper>
    </Container>
    </div>
  )
}
export default DonarProduct
