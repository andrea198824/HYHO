import React, { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import {getDonation} from "../../store/actions"
import { DataGrid } from "@material-ui/data-grid";


const DonarProduct = () =>{
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
      useEffect(()=>{
          if(token){
              dispatch(getDonation(token))    
          }
      },[token])
      const productDonate = useSelector(state => state.productsDonate)
   
      const columns =[
      { field: "title", headerName: "Title", width: 120 },
      { field: "descriptions", headerName: "Descriptions", width: 190 },   {
        field: "image",
        headerName: "Imagen",
        width: 480,
        renderCell: (params) => {
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.image} alt="" />
            </div>
          );
        },
      }, { field: "stock", headerName: "Stock", width: 120 }]

   return (
    <div className="productList">
      <DataGrid
        rows={productDonate}
        disableSelectionOnClick
        columns={columns}
        pageSize={productDonate.length}
        checkboxSelection
      />
    </div>
  );
}

export default DonarProduct