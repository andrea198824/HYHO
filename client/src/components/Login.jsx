import React from 'react'
// import { useAuth0 } from '@auth0/auth0-react'
import styled from "styled-components";
import {
    Facebook,
    
} from "@material-ui/icons";


const Button = styled.button`
  width: 20%;
  border: none;
  /*padding: 10px 10px 10px;*/
  background-color: #dbd3f7;
  color: #4d4442;
  cursor: pointer;
  margin-bottom: 10px;
`;

const LoguinBtn = () => {
    // const { loginWithRedirect  } = useAuth0()

    return (
        <Button
            // onClick={
            //     () => 
            //     // loginWithRedirect()
            // }
        >
            <Facebook />
            
        </Button>
        )
}

export default LoguinBtn