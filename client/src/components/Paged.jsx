import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Paginacion = styled.div`
  justify-content: center;
  margin: 20px 0;
  align-items: center;
//  text-align: center;
// align-content:center; 
`;
const Button = styled.button`
width: 40px;
height: 20px;
-webkit-box-shadow: 2px 5px 16px 0px #0B325E, inset 7px 18px 29px 9px rgba(0,0,0,0.47); 
box-shadow: 2px 5px 16px 0px #0B325E, inset 7px 18px 29px 9px rgba(0,0,0,0.47);
`;


function Paged ({productsPerPage, products, paged}) {
    const pageNumber = [];
    let i = 0;
    let rest= products  ;
    while (rest>0) {
      rest -= productsPerPage;
      i++;
      pageNumber.push(i);
    }
    return (
      <Div>
            <Paginacion>
              { pageNumber?.map(num => { 
                  return(     
                      <Button  key={num} onClick = {()=>paged(num)}>{num}</Button>
                )})
              }
            </Paginacion>  
      </Div>
    )
};

export default Paged ;