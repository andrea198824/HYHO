import React from 'react'
import styled from 'styled-components'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps'
import { Link } from 'react-router-dom'



const linkStyle = {
  width: '100px',
  height: '100px',
  textDecoration: 'none',
  color: 'inherit',
  width: '50%',
  marginLeft: '45%',
  paddingRight: '20px',
  border: 'none',
  padding: '15px 30px 15px 20px',
  backgroundColor:' #dbd3f7',
  cursor: 'pointer',

}

function Maps  (props)  {
  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: -34.6037851, lng: -58.381775 }}
      ></GoogleMap>

       <Marker
         draggable={true}
         position={{ lat: -34.6037851, lng: -58.381775 }}
      ></Marker>

       <p>Podes encontrarnos en Av. 9 de Julio, C1043 CABA, Argentina</p>
       <Link to='/' style={linkStyle}>Back</Link>
     
    </div>
  )
}
//lat: -34.6037851, lng: -58.381775
export default withScriptjs(withGoogleMap(Maps))
