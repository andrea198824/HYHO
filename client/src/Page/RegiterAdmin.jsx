import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { mobile } from "../responsive";
import { createadmin } from '../store/actions';

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

    if (!input.fullName) {
        errors.fullName = 'Nombre Es Requerido';
    } else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(input.fullName)) {
        errors.fullName = 'Nombre es Inválido';
    }
   
    

    if (!input.email) {
        errors.mail = 'Correo Requerido';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.mail = 'Correo Invalido';
    }

    if (!input.password) {
        errors.password = 'Contraseña Requerida';
    } else if (!/^(?=.{10,}$)(?=(?:.*?[A-Z]){2})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$/.test(input.password)) {
        errors.password = '2 may, 1 min, 2 díg long 10';
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

const RegisterAdmin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        fullName: '',
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
        dispatch(createadmin(input))
        navigate("/");
    }

    return (
        <Container>

            <Wrapper>
                <Title>CREAR UNA CUENTA ADMINISTRADOR</Title>

                <Form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <Input
                            onChange={(e) => handleInputChange(e)}
                            type='text'
                            name='fullName'
                            placeholder="Nombre"
                        />

                        {errors.name && (
                            <Paragraph>{errors.name}</Paragraph>
                        )}
                    </div>
                    {/*<div>*/}
                    {/*    <Input*/}
                    {/*        onChange={(e) => handleInputChange(e)}*/}
                    {/*        type='text'*/}
                    {/*        name='billing_address'*/}
                    {/*        placeholder="Dirección Facturación"*/}
                    {/*    />*/}
                    {/*    {errors.billing_address && (*/}
                    {/*        <Paragraph>{errors.billing_address}</Paragraph>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <Input*/}
                    {/*        onChange={(e) => handleInputChange(e)}*/}
                    {/*        type='text'*/}
                    {/*        name='shipping_address'*/}
                    {/*        placeholder="Dirección Envío"*/}
                    {/*    />*/}
                    {/*    {errors.shipping_address && (*/}
                    {/*        <Paragraph>{errors.shipping_address}</Paragraph>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <Input*/}
                    {/*        onChange={(e) => handleInputChange(e)}*/}
                    {/*        type='number'*/}
                    {/*        name='phone'*/}
                    {/*        placeholder="Número Celular"*/}
                    {/*    />*/}
                    {/*    {errors.phone && (*/}
                    {/*        <Paragraph>{errors.phone}</Paragraph>*/}
                    {/*    )}*/}
                    {/*</div>*/}

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
                            name='password'
                            placeholder="Contraseña"
                        />
                        {errors.password && (
                            <Paragraph>{errors.password}</Paragraph>
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
                    <div>
                        <Button
                            type='submit'
                            disabled={!errors.disabled}
                        >
                            Crear
                        </Button>
                    </div>

                    <Div>
                        <Link to='/' style={linkStyle}>
                            <Button>Volver</Button>
                        </Link>
                    </Div>

                </Form>


            </Wrapper>

        </Container>
    );
};
export default RegisterAdmin;