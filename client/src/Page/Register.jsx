import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom'

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
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const linkStyle = {
    textDecoration: "none",
    color: 'inherit',
    width: '40%',
}

const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title>CREAR UNA CUENTA</Title>
                <Form>
                    <Input placeholder="Nombre" />
                    <Input placeholder="Apellido" />
                    <Input placeholder="Usuario" />
                    <Input placeholder="Correo" />
                    <Input placeholder="Contraseña" />
                    <Input placeholder="Confirmar Contraseña" />
                    <Link to='/' style={linkStyle}>
                        <Button>Crear</Button>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
