import React from 'react'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps'
import { Link } from 'react-router-dom'

function Map({ lat, lng }) {
    
  return (
      <div>
          <GoogleMap
              defaultZoom={15}
              defaultCenter={{ lat, lng }}
          ></GoogleMap>


          <Marker
              draggable={true}
              position={{ lat, lng }}
          >
          </Marker>
          
          <p>Podes encontrarnos en Av. 9 de Julio, C1043 CABA, Argentina</p>
          <Link to='/'>Back</Link>
      </div>
  )
}
//lat: -34.6037851, lng: -58.381775
export default withScriptjs(withGoogleMap(Map))
