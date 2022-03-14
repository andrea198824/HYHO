import { Send } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router";
import axios from "axios";



const Container = styled.div`
  height: 60vh;
  background-color: #f7dbd3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: ${props => props.disabled?"#dbd3f7" : "blue"};
  color: white;
`;

const Paragraph = styled.p`
   color: red;
   font-size: 15px;
   font-weight: 3;
`;

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

const Newsletter = () => {
    
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
        const handleClick = e => {
          e.preventDefault()
          axios.post('http://localhost:3001/newsletter', input)
          .then((res) =>{
          alert(`${input.email} gracias por subscribirte`)
          window.scrollTo(0,0)}
          )
        }

        
                  

  return (
    <Container>
      <Title>Noticias</Title>
      <Desc>Suscribite y enterate de todos lo que logramos con su ayuda</Desc>
          <InputContainer>
              
              <Input onChange={(e) => handleInputChange(e)}
                  type='email'
                  name='email'
                  placeholder="Tu email..."
                 
              />
              

    
              <Button disabled={errors.active} onClick={handleClick}>

            

                  <Send />
              </Button>

              
        
          </InputContainer>
          {errors.mail && (
              <Paragraph>{errors.mail}</Paragraph>
          )}
    </Container>
  );
};

export default Newsletter;

  
