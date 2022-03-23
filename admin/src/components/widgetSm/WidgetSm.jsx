import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/actions';
import "./widgetSm.css";

export default function WidgetSm() {
  
  const dispatch = useDispatch();
  const token = useSelector((state)=> state.token);
  const allUsers = useSelector((state)=> state.users);
  const [firtUsers, setFirtUsers] = useState([]);


  useEffect (()=>{
    if (allUsers.length) {
       setFirtUsers(allUsers.slice(allUsers.length-5))
       console.log("los 5 Users 😊😉😄😅😆:", firtUsers);
    }
  },firtUsers)

  if (!allUsers.length) {
    setTimeout(() => {
      dispatch(getUsers(token));
    }, 2000)
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Nuevos Miembros</span>
      <ul className="widgetSmList">
           {
             firtUsers?.map(u =>{
                return (
                   <li className="widgetSmListItem">
                     <img
                       src={u.picture} alt="" className="widgetSmImg"/>
                     <div className="widgetSmUser">
                       <span className="widgetSmUsername">{u.nickname}</span>
                     </div>
                     <div className="widgetSmUser">
                       <span className="widgetSmUsername">{u.createdAt}</span>
                     </div>
                     
                   </li>
                )
             })
           }
      </ul>
    </div>
  );
}
