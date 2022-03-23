import "./productList.css";
import React from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, deleteProduct  } from '../../store/actions';


const ProductList = () => {
 

  const dispatch = useDispatch();
  const products = useSelector((state)=> state.products);
  const token = useSelector((state)=> state.token);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id, token));
    // dispatch(getProducts());
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Producto",
      width: 480,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "stock",
       headerName: "Stock", 
       width: 120
    },
    {
      field: "price",
      headerName: "$ Precio",
      width: 160,
    },
    {
      field: "action",
      headerName: "Accion",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}

export default ProductList
