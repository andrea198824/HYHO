import React from "react";
import "./topbar.css";
import { ExitToApp } from "@material-ui/icons";

export default function Topbar() {
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
  );
}
