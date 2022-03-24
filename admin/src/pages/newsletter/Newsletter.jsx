import React from 'react';
import "./newsletter.css";
import { DataGrid } from "@material-ui/data-grid";
import { userRows } from "../../dummyData";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getNewsletter } from '../../store/actions';


const Newsletter = () => {

    const dispatch = useDispatch();
    const token = useSelector((state)=> state.token);
    const emails = useSelector((state)=> state.newsletter);
    const [mails, setMails] = useState([]);
   
    useEffect(() => {
        dispatch(getNewsletter(token))
        setMails(mails.concat(emails));   
    }, [])

      // if (!emails.length) {
      //   setTimeout(() => {
      //     dispatch(getNewsletter(token))
      //     setMails(mails.concat(emails));   
      //   }, 2000)
      // } 

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "mails",
          headerName: "Mails",
          width: 480,
          renderCell: (params) => {
            return (
              <div className="productListItem">
                {mails && params.row.email}
              </div>
            );
          },
       
        },
        { field: "createdAt", headerName: "Subcripto", width: 200 },
      ];  

  return (
    <div className="productList">
    <DataGrid
      rows={mails}
      disableSelectionOnClick
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
    />
  </div>
  )
}

export default Newsletter
