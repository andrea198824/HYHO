import React from 'react';
import "./pyments.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../store/actions';

const Pyments = () => {

    const dispatch = useDispatch();
    const token = useSelector((state)=> state.token);
    const orders = useSelector((state)=> state.orders);
   


    const columns = [
        { field: "id", headerName: "ID de Orden", width: 120 },
        {
          field: "userId",
          headerName: "id usuario",
          width: 160,
          renderCell: (params) => {
            return (
              <div className="productListItem">
                {orders && params.row.order}
              </div>
            );
          },
       
        },
        { field: "status", headerName: "Estado", width: 200 },
        { field: "total", headerName: "Importe $", width: 200 },
        { field: "createdAt", headerName: "fecha", width: 200 },  
    ];  

  return (
    <div className="productList">
    <DataGrid
      rows={orders}
      disableSelectionOnClick
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
    />
  </div>
  )
}

export default Pyments
