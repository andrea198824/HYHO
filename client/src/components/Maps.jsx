import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { Link } from 'react-router-dom'

const Map = props => {
  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: -34.6037851, lng: -58.381775 }}
      />
      <Link to='/'>Back</Link>
    </div>
  )
}

export default withScriptjs(withGoogleMap(Map))
