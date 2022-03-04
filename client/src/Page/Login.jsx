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
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Anchor = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const linkStyle = {
    color: 'inherit',
}

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <Title>INICIO DE SESION</Title>
                <Form>
                    <Input placeholder="Usuario" />
                    <Input placeholder="Contraseña" />
                    <Link to='/home' style={linkStyle}>
                        <Button >Iniciar Sesion</Button>
                    </Link>
                    <Anchor>No recuerdas la contraseña?</Anchor>
                    <Link to='/register' style={linkStyle}>
                        <Anchor to='/register'>Registrarse</Anchor>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
