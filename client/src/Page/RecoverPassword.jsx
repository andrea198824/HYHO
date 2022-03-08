import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";


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
  width: 35%;
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
  width: 40%;
  border: none;
  padding: 10px 20px ;
  background-color: #dbd3f7;
  color: #4d4442;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Anchor = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Paragraph = styled.p`
   color: red;
   font-size: 15px;
   font-weight: 3;
   
`;

const linkStyle = {
    color: 'inherit',
}

export function validate(input) {
    let errors = {};

    if (!input.email) {
        errors.mail = 'Correo Requerido';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.mail = 'Correo Invalido';
    }

    if (Object.keys(errors).length === 0) {
        errors.active = false
    }

    else errors.active = true
    return errors;
};

const RecoverPassword = () => {

    const navigate = useNavigate()

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({        
        email: '',
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
        console.log(input)
        alert(`Correo enviado a ${input.email}`)
        navigate('/')
    }
    
    return (
        <Container>
            <Wrapper>
                <Title>Recuperar Contraseña</Title>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <Input onChange={(e) => handleInputChange(e)}
                            type='email'
                            name='email'
                            placeholder="Tu email..."
                            
                        />
                    {errors.mail && (
                        <Paragraph>{errors.mail}</Paragraph>
                        )}
                    </div>


                    
                        <Button
                            type='submit'
                            disabled={errors.active || input.email===''}
                        >
                            Recuperar Contraseña
                        </Button>
                    
                    <Link to='/' style={linkStyle}>
                        <Anchor>Home</Anchor>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    );
};
export default RecoverPassword;