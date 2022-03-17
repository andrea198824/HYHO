import React from 'react'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps'
import { Link } from 'react-router-dom'

const Map = props => {
  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: -34.6037851, lng: -58.381775 }}
      ></GoogleMap>


      <Marker position={{ lat: -34.6037851, lng: -58.381775 }}></Marker>
      <p>Podes encontrarnos en Av. 9 de Julio, C1043 CABA, Argentina</p>
      <Link to='/'>Back</Link>
    </div>
  )
}

export default withScriptjs(withGoogleMap(Map))
