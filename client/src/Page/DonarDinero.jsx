import React, { useState } from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router';
import NavBar from '../components/Navbar';
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

// const linkStyle = {
//     textDecoration: "none",
//     color: 'inherit',
//     width: '50%',
//     padding: '5px'
// }

// const Input = styled.input`
// `
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
    // const navigate = useNavigate()
    

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        title:'',
        apellido:'',
        cantidad:'',
        email:'',
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
        <div>
            <NavBar/>
      <Announcement/>
        <Container>
        <Title> Donar Dinero</Title>
            <Wrapper>
                
               
                <Form onSubmit={(e) => handleSubmit(e)}>
                <DivItemUno>
                    <div>
                        
                        <Item0
                            onChange={(e) => handleInputChange(e)}
                            type='text'
                            name='title'
                            placeholder="Nombre"
                        />

                        {errors.title && (
                            <Paragraph>{errors.title}</Paragraph>
                        )}
                    </div>
                    <div>
                        <Item0
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
                            onChange={(e) => handleInputChange(e)}
                            type='text'
                            name='cantidad'
                            placeholder="$"
                        />
                        {errors.cantidad && (
                            <Paragraph>{errors.cantidad}</Paragraph>
                        )}
                    </div>
                    </DivItemUno>
                   
                    <DivItemDos>
                    <div>
                       
                            <Button 
                                type='submit'
                                disabled={!errors.disabled}>Donar</Button>
                        
                        <Link to='/' >
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
export default DonarDinero;