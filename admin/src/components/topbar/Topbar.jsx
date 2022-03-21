import React from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import "./topbar.css";
import { ExitToApp } from "@material-ui/icons";


const profilePic = {
  width: 'auto',
  height: '40px',
  padding: '4px',
  borderRadius: '2rem'
}

export default function Topbar() {

  const token = useSelector(state => state.token)
  const { user, isLoading, logout } = useAuth0();
  console.log("este es el user:", user);
 
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Tu.ong</span>
        </div>
        { isLoading ?
            <div className="topRight">
              <h3>CARGANDO...</h3>
            </div>
            :
            user &&
           <div className="topRight">
             <div className="topbarIconContainer" onClick={() => logout({ returnTo: window.location.origin })} >
               <h3>Cerrar Sesion</h3>
               <ExitToApp />
               <img src={user.picture} style={profilePic} alt="" />
             </div>
           </div>
        }
      </div>
    </div>
  )
}


