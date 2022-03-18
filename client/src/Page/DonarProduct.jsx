
import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import FileBase from 'react-file-base64'
import axios from 'axios'
import NavBar from '../components/Navbar'
import { Height } from '@material-ui/icons'

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background: linear-gradient(#d3f7db, #f7dbd3),
    url('https://lavozdemotul.com/wp-content/uploads/2016/08/registration-page-background-504-1.png')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 320px) {
    display: none;
    width: 40px;
  }
`

const Wrapper = styled.div`
  width: 40%;
 
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
  @media (max-width: 320px) {
    display: none;
    width: 40px;
  }
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  padding-left: 30%
  @media (max-width: 320px) {
    display: none;
  }
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 320px) {
    display: none;
  }
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

const Button = styled.button`
  width: 40%;
  margin-top: 20px;
  padding-right: 10px
  border: none;
  padding: 15px 30px 15px 20px;
  background-color: #dbd3f7;
  color: #4d4442;
  cursor: pointer;

  &:disabled {
    background-color: gray;
    color: black;
    opacity: 0.7;
    cursor: pointer;
  }
  &:hover {
    background: dark-gray;
  }
  
`

const Paragraph = styled.p`
  color: red;
  font-size: 15px;
  font-weight: 3;
`

const Div = styled.div`
    display:'flex',
    position: 'absolute',
    justify-content: 'space-around',
    
`

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  width: '50%',
  padding: '5px'
}

const fileBase = {
  margin: '20px',
  padding: '10px'
}

const file = {
  padding: '25px',
  margin: '5px'
}

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

  if (Object.keys(errors).length <= 1) {
    errors.disabled = true
  } else {
    errors.disabled = false
  }

  return errors
}

const DonarProduct = () => {
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    title: '',
    image: '',
    cantidad: '',
    descriptions: ''
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

    axios.post('/donate-form', input).then(res => {
      console.log('entro res', res)
      alert(` Gracias por tu donacion`)
      navigate('/')
    })
  }

  console.log(errors)

  return (
    <div>
      <NavBar />
      <Container>
        <Wrapper>
          <Title> Donar Producto</Title>

          <Form onSubmit={handleSubmit}>
            <div>
              <Input
                onChange={e => handleInputChange(e)}
                type='text'
                name='title'
                placeholder='Nombre del Producto'
              />

            {errors.title && <Paragraph>{errors.title}</Paragraph>}
          </div>
          <div>
            <Input
              onChange={e => handleInputChange(e)}
              type='number'
              name='cantidad'
              placeholder='Cantidad'
            />
            {errors.cantidad && <Paragraph>{errors.cantidad}</Paragraph>}
          </div>
          <div>
            <Input
              onChange={e => handleInputChange(e)}
              type='text'
              name='description'
              placeholder='Descripcion'
            />
            {errors.lastName && <Paragraph>{errors.descriptions}</Paragraph>}
          </div>
        
        

          <div style={file}>
            <FileBase styled={fileBase} type='file' multiple={false} onDone={getBaseFile} />

            {errors.image && <Paragraph>{errors.image}</Paragraph>}
          </div>
          <Div>
            <Link to='/' style={linkStyle}>
              <Button type='submit' disabled={!errors.disabled}>
                Crear
              </Button>
            </Link>
            <Link to='/' style={linkStyle}>
              <Button>Volver</Button>
            </Link>
          </Div>
        </Form>
      </Wrapper>
    </Container>
    </div>
  )
}
export default DonarProduct
