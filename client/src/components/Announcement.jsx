import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 30px;
  background-color: #d3f7db;
  color: #4d4442;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  padding-right: 20px;
  width: cover;
  ${mobile({ display: 'none'})}
`;

const Announcement = () => {
  return <Container>Ayudanos a ayudar. Cualquier colaboracion suma </Container>;
};

export default Announcement;
