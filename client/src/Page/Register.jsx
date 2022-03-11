import React, { useState } from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom'


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
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
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
  font-size: 15px;
  font-weight: 3;
`;

const Div = styled.div`
    display:'flex',
    position: 'absolute',
    justify-content: 'space-around',
    
`

const linkStyle = {
   
    textDecoration: "none",
    color: 'inherit',
    width: '50%',
    padding: '5px'
    
    
}

export function validate(input) {
    let errors = {};
    
    if (!input.name) {
        errors.name = 'Nombre Es Requerido';
    } else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(input.name)) {
        errors.name = 'Nombre es Invalido';
    }

    if (!input.lastName) {
        errors.lastName = 'Apellido Es Requerido';
    } else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(input.lastName)) {
        errors.lastName = 'Apellido Invalido';
    }

    if (!input.userName) {
        errors.userName = 'Usuario Requerido';
    } else if (!/[a-zA-Z1-9]{8}/g.test(input.userName)) {
        errors.userName = 'Usuario Demasiado Corto';
    }

    if (!input.email) {
        errors.mail = 'Correo Requerido';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.mail = 'Correo Invalido';
    }

    if (!input.passworda) {
        errors.passworda = 'Contraseña Requerida';
    } else if (!/^(?=.{10,}$)(?=(?:.*?[A-Z]){2})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$/.test(input.passworda)) {
        errors.passworda = '2 may, 1 min, 2 díg long 10';
    }

    if (!input.passwordb) {
        errors.passwordb = 'Contraseña Requerida';
    } else if ((input.passworda !== input.passwordb)) {
        errors.passwordb = 'Contraseñas No Coinciden';
    }

    if (Object.keys(errors).length === 0) {
        errors.disabled = true
    }
    else errors.disabled = false

    return errors;
};

const Register = () => {

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
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

    const handleSubmit = (e) => {
        e.preventDefault()
    }
      
    return (
        <Container>
            
            <Wrapper>
                <Title>CREAR UNA CUENTA</Title>
               
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <Input
                            onChange={(e) => handleInputChange(e)}
                            type='text'
                            name='name'
                            placeholder="Nombre"
                        />

                        {errors.name && (
                            <Paragraph>{errors.name}</Paragraph>
                        )}
                    </div>
                    <div>
                        <Input
                            onChange={(e) => handleInputChange(e)}
                            type='text'
                            name='lastName'
                            placeholder="Apellido"
                        />
                        {errors.lastName && (
                            <Paragraph>{errors.lastName}</Paragraph>
                        )}
                    </div>
                    <div>
                        <Input
                            onChange={(e) => handleInputChange(e)}
                            type='text'
                            name='userName'
                            placeholder="Usuario"
                        />
                        {errors.userName && (
                            <Paragraph>{errors.userName}</Paragraph>
                        )}
                    </div>
                    <div>
                        <Input
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
                    <Input
                        onChange={(e) => handleInputChange(e)}
                        type='password'
                        name='passworda'
                        placeholder="Contraseña"
                    />
                    {errors.passworda && (
                        <Paragraph>{errors.passworda}</Paragraph>
                    )}
                    </div>
                    <div>
                        <Input
                            onChange={(e) => handleInputChange(e)}
                            type='password'
                            name='passwordb'
                            placeholder="Confirmar Contraseña"
                        />
                        {errors.passwordb && (
                            <Paragraph>{errors.passwordb}</Paragraph>
                        )}
                    </div>
                    <Div>
                        <Link to='/' style={linkStyle}>
                            <Button
                                type='submit'

                                disabled={!errors.disabled}>Crear</Button>
                        </Link>
                        <Link to='/' style={linkStyle}>
                            <Button>Volver</Button>
                        </Link>
                    </Div>
                    
                </Form>
                
                
            </Wrapper>
            
        </Container>
    );
};
export default Register;