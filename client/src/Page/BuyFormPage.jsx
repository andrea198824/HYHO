import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link} from 'react-router-dom'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { getToken, modifyuser } from '../store/actions';




// import { createUser } from '../store/actions';

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
  padding-top:35px;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:space-around;
  align-items:unset;
  align-content:flex-end;
  height: 20vh; /*Este valor lo puedes omitir si la altura de tu componente esta definida*/
`

// const DivItemTres = styled.div`
//  display:flex;
//   flex-direction:row;
//   flex-wrap:wrap;
//   justify-content:space-around;
//   align-items:unset;
//   align-content:flex-start;
//   height: 20vh; /*Este valor lo puedes omitir si la altura de tu componente esta definida*/
// `

const Item0 = styled.input`
order:1;
  flex:0 1 center;
  align-self:flex-start;
  height:4vh;
  width:20vh;
  margin-top: 3vh;
`

// const Item1 = styled.input`
// order:2;
//   flex:0 1 center;
//   align-self:flex-start;
//   height:5vh;
//   width:25vh;
//   margin-top: 3vh;
// `

const linkStyle = {
    textDecoration: "none",
    color: 'inherit',
    width: '50%',
    padding: '5px'
}

// const Input = styled.input`

// `

export function validate(input) {
    let errors = {};

    if (!input.street) {
        errors.street = 'Campo Es Requerido';
    } else if (!/^([A-ZÁÉÍÓÚ][a-zñáéíóú]+[\s]*)+$/.test(input.street)) {
        errors.street = 'Nombre es Invalido';
    }

    if (!input.number) {
        errors.number = 'Campo Requerido';
    } else if (!/[1-9]/g.test(input.number)) {
        errors.number = 'Direccion Demasiado Corta';
    }

    if (!input.state) {
        errors.state = 'Campo Requerido';
    } else if (!/[a-zA-Z]/g.test(input.state)) {
        errors.state = 'Direccion Demasiado Corto';
    }

    if (!input.city) {
        errors.city = 'Campo Requerido';
    } else if (!/[a-zA-Z]/g.test(input.city)) {
        errors.city = 'Direccion Demasiado Corto';
    }

    if (!input.phone) {
        errors.phone = 'Celular Requerido';
    } else if (!/[1-9]/g.test(input.phone)) {
        errors.phone = 'Numero Incorrecto';
    }

    

    if (Object.keys(errors).length === 0) {
        errors.disabled = true
    }
    else errors.disabled = false

    return errors;
};

const BuyFormPage = () => {

    const dispatch = useDispatch();
    const { user, getAccessTokenSilently, isLoading } = useAuth0();
    const token = useSelector( state => state.token)

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        street: '',
        number: '',
        state: '',
        city: '',
        phone: ''
    });

    if (!isLoading) {
        getAccessTokenSilently()
            .then(res => {
                dispatch(getToken(res))              
            })

    }
        
    const handleInputChange = function (e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Desde Pagina', JSON.stringify(input))
        dispatch(modifyuser(input, user, token))
        
    }
      
    return (
        <div>
            
            <Navbar />
            <Announcement />
        <Container>

                <Title>Datos De Envios</Title>

            <Wrapper>
                     
                <Form onSubmit={(e) => handleSubmit(e)}>

                        <DivItemUno>
                            <div>
                                <Item0
                                    onChange={(e) => handleInputChange(e)}
                                    type='text'
                                    name='street'
                                    placeholder="Calle"
                                />
                                {errors.street && (
                                    <Paragraph>{errors.street}</Paragraph>
                                )}
                            </div>
                            <div>
                                <Item0
                                    onChange={(e) => handleInputChange(e)}
                                    type='number'
                                    name='number'
                                    placeholder="Número"
                                />
                                {errors.number && (
                                    <Paragraph>{errors.number}</Paragraph>

                                )}
                            </div>
                            <div>
                                <Item0
                                    onChange={(e) => handleInputChange(e)}
                                    type='text'
                                    name='phone'
                                    placeholder="Número Celular"
                                />
                                {errors.phone && (
                                    <Paragraph>{errors.phone}</Paragraph>
                                )}
                            </div>

                            <div>
                                <Item0
                                    onChange={(e) => handleInputChange(e)}
                                    type='text'
                                    name='state'
                                    placeholder='provincia'
                                />
                                {errors.state && (
                                    <Paragraph>{errors.state}</Paragraph>
                                )}
                            </div>

                            <div>
                                <Item0
                                    onChange={(e) => handleInputChange(e)}
                                    type='text'
                                    name='city'
                                    placeholder="Ciudad"

                                />
                                {errors.city && (
                                    <Paragraph>{errors.city}</Paragraph>
                                )}
                            </div>
                        </DivItemUno>
              

                    <DivItemDos>
                        <div>
                            
                                <Button
                                    type='submit'

                                    disabled={!errors.disabled}>Enviar
                                </Button>
                            
                        </div>
                        <div>
                            <Link to='/' style={linkStyle}>


                                <Button>Volver</Button>
                            </Link>
                        </div>
                    </DivItemDos>
                    
                </Form>
                
                
            </Wrapper>
            
            </Container>
            </div>
    );
};
export default BuyFormPage;