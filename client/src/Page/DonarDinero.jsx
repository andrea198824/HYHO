import React, { useState } from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';


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
    
    if (!input.title) {
        errors.title = 'Nombre Es Requerido';
    } else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(input.title)) {
        errors.title = 'Nombre es Invalido';
    }
    if (!input.email) {
        errors.mail = 'Correo Requerido';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.mail = 'Correo Invalido';
    }
 

    
    if (!input.description) {
        errors.description = 'Description is required';
    } else if (input.description.length < 10) {
        errors.description = 'Description must have at least 10 characters'
    }
    if (!input.cantidad) {
        errors.cantidad = 'Amount is required';
    } else if (input.cantidad.length < 1) {
        errors.cantidad = 'Must have at least 1 Product'
    }



    

   

    if (Object.keys(errors).length === 0) {
        errors.disabled = true
    }
    else errors.disabled = false

    return errors;
};

const DonarDinero= () => {
    const navigate = useNavigate()
    

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        nombre:'',
        apellido:'',
        cantidad:'',
        email:'',
    });
    
    const handleInputChange = function (e) {
        e.preventDefault()
        
        setInput({
            
            ...input,
            [e.target.title]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.title]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
            
        
            navigate("/");
        
        
          
    }

    
    
      
    return (
        <Container>
            
            <Wrapper>
                <Title> Donar Dinero</Title>
               
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <Input
                            onChange={(e) => handleInputChange(e)}
                            type='text'
                            name='nombre'
                            placeholder="Nombre"
                        />

                        {errors.title && (
                            <Paragraph>{errors.title}</Paragraph>
                        )}
                    </div>
                    <div>
                        <Input
                            onChange={(e) => handleInputChange(e)}
                            type='text'
                            name='apellido'
                            placeholder="Apellido"
                        />
                        {errors.apellido && (
                            <Paragraph>{errors.apellido}</Paragraph>
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
                            type='number'
                            name='cantidad'
                            placeholder="Cantidad"
                        />
                        {errors.cantidad && (
                            <Paragraph>{errors.cantidad}</Paragraph>
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
export default DonarDinero;