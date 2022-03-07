import { React, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://lavozdemotul.com/wp-content/uploads/2016/08/registration-page-background-504-1.png")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

    &:disabled {
    background-color: gray;
    color: black;
    opacity: 0.7;
    cursor: default;
  }
  
`;

const Anchor = styled.div`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

const Paragraph = styled.p`
   color: red;
   font-size: 15px;
   font-weight: 900;
`;

const linkStyle = {
    color: 'inherit',
}

export function validate(input) {
    let errors = {};

    if (!input.mail) {
        errors.mail = 'Correo Requerido';
    } else if (!/\S+@\S+\.\S+/.test(input.mail)) {
        errors.mail = 'Correo Invalido';
    }

    return errors;
};

const Login = () => {

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        mail: '',
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

    const hundleSubmit = (e) => {
        e.preventDefault()
       
    }

    return (
        <Container>
            <Wrapper>
                <Title>INICIO DE SESION</Title>
                <Form onSubmit={(e) => hundleSubmit(e)}
                >
                    <div>
                        <Input
                            onChange={(e) => handleInputChange(e)}
                            type='email'
                            name='mail'
                            placeholder='Correo Electónico'
                        />
                    {errors.mail && (
                        <Paragraph>{errors.mail}</Paragraph>
                        )}
                    </div>
                    <Input
                        onChange={(e) => handleInputChange(e)}
                        type='password'
                        name='password'
                        placeholder="Contraseña"
                    />
                    
                    <div>
                        <Link to={'/'} style={linkStyle}>
                            <Button
                                type='submit'
                                disabled={!input.mail || !input.password}
                            >
                                Ingresar
                            </Button>
                        </Link>
          
                    </div>
                    <Link to='/recoverpass' style={linkStyle}>
                        <Anchor>Recuperar Contraseña</Anchor>
                    </Link>
                    <Link to='/register' style={linkStyle}>
                        <Anchor>Registrarse</Anchor>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
