import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@material-ui/core'
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../store/actions';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      #d3f7db,
      #f7dbd3
    ),
    url("https://lavozdemotul.com/wp-content/uploads/2016/08/registration-page-background-504-1.png")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
    
`;

const Title = styled.h1`
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
 display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:space-around;
  align-items:unset;
  align-content:flex-start;
  height: 15vh; /*Este valor lo puedes omitir si la altura de tu componente esta definida*/
`

const DivItemDos = styled.div`
 display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:space-around;
  align-items:unset;
  align-content:flex-start;
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
  height:5vh;
  width:25vh;
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

const Textarea = styled.textarea`
display: flex;
flex-direction: row;
justify-content:space-around;
`
const linkStyle = {
    textDecoration: "none",
    color: 'inherit',
    width: '50%',
    padding: '5px'
}

export function validate(input) {
    let errors = {};
    
    if (!input.fullName) {
        errors.fullName = 'Campo Es Requerido';
    } else if (!/^([A-ZÁÉÍÓÚ][a-zñáéíóú]+[\s]*)+$/.test(input.fullName)) {
        errors.fullName = 'Nombre es Invalido';
    }

    if (!input.billing_address) {
        errors.billing_address = 'Campo Requerido';
    } else if (!/[a-zA-Z1-9]/g.test(input.billing_address)) {
        errors.billing_address = 'Direccion Demasiado Corta';
    }

    if (!input.shipping_address) {
        errors.shipping_address = 'Campo Requerido';
    } else if (!/[a-zA-Z1-9]/g.test(input.shipping_address)) {
        errors.shipping_address = 'Direccion Demasiado Corto';
    }

    if (!input.phone) {
        errors.phone = 'Celular Requerido';
    } else if (!/[1-9]/g.test(input.phone)) {
        errors.phone = 'Numero Incorrecto';
    }

    if (!input.email) {
        errors.mail = 'Correo Requerido';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.mail = 'Correo Invalido';
    }

    if (!input.password) {
        errors.password = 'Contraseña Requerida';
    } else if (!/[a-zA-Z1-9]{6}/.test(input.password)) {
        errors.password = 'minimo 6 caracteres';
    }

    if (!input.passwordb) {
        errors.passwordb = 'Contraseña Requerida';
    } else if ((input.password !== input.passwordb)) {
        errors.passwordb = 'Contraseñas No Coinciden';
    }

    if (Object.keys(errors).length === 0) {
        errors.disabled = true
    }
    else errors.disabled = false

    return errors;
};

const Register = () => {

    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        fullName : '',
        email : '',
        password: '',
        billing_address : '',
        shipping_address : '',
        phone : ''
    });

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

    const [showPassword, setShowPasword] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createUser(input))
        navigate("/");
    }
      
    return (
        <Container>
            
            <Wrapper>
                <Title>CREAR DE USUARIO</Title>
               
                <Form onSubmit={(e) => handleSubmit(e)}>

                    <DivItemUno>
                        <div>
                            <Item0
                                onChange={(e) => handleInputChange(e)}
                                type='text'
                                name='fullName'
                                placeholder="Nombre y Apellido"
                            />
                        {errors.fullName && (
                            <Paragraph>{errors.fullName}</Paragraph>
                            )}
                        </div>
                        <div>
                            <Item1
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
                                onChange={(e) => handleInputChange(e)}
                                type='text'
                                name='phone'
                                placeholder="Número Celular"
                            />
                            {errors.phone && (
                                <Paragraph>{errors.phone}</Paragraph>
                            )}
                        </div>
                    </DivItemUno>

                    <DivItemDos>
                        <div>
                            <Textarea
                                onChange={(e) => handleInputChange(e)}
                                type='text'
                                name='billing_address'
                                placeholder="Direccion de Facturacion"
                                cols='30'
                                rows='7'
                                resize='none'
                                autoCapitalize='words'
                                spellcheck='true'
                            />
                            {errors.billing_address && (
                                <Paragraph>{errors.billing_address}</Paragraph>
                            )}
                        </div>
                        <div>
                            <Textarea
                                onChange={(e) => handleInputChange(e)}
                                type='text'
                                name='shipping_address'
                                placeholder="Direccion de Residencia"
                                cols='30'
                                rows='7'
                                resize='none'
                                autoCapitalize='words'
                            />
                            {errors.shipping_address && (
                                <Paragraph>{errors.shipping_address}</Paragraph>
                            )}
                        </div>
                    </DivItemDos>

                    <DivItemTres>
                        <div>
                            
                            <Item0
                                onChange={(e) => handleInputChange(e)}
                                type={showPassword ? 'password' : 'text'}
                                name='password'
                                placeholder="Contraseña"
                               
                            />
                            {showPassword ? < Icon onClick={() => setShowPasword(!showPassword)}>visibility_off</Icon> : <Icon onClick={() => setShowPasword(!showPassword)}>visibility</Icon> }
                            {errors.password && (
                                <Paragraph>{errors.password}</Paragraph>
                            )}
                        </div>

                        <div>
                            
                            <Item1
                                onChange={(e) => handleInputChange(e)}
                                type={showPassword ? 'password' : 'text'}
                                name='passwordb'
                                placeholder="Confirmar Contraseña"
                                
                            />
                            {showPassword ? < Icon onClick={() => setShowPasword(!showPassword)}>visibility_off</Icon> : <Icon onClick={() => setShowPasword(!showPassword)}>visibility</Icon>}
                            {errors.passwordb && (
                                <Paragraph>{errors.passwordb}</Paragraph>
                            )}
                        </div>
                    </DivItemTres>

                    <DivItemUno>
                        <div>
                            
                                <Button
                                    type='submit'

                                    disabled={!errors.disabled}>Crear
                                </Button>
                            
                        </div>
                        <div>
                            <Link to='/' style={linkStyle}>


                                <Button>Volver</Button>
                            </Link>
                        </div>
                    </DivItemUno>
                    
                </Form>
                
                
            </Wrapper>
            
        </Container>
    );
};
export default Register;