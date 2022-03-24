import React from 'react'
import credentials from '../credentials'
import Maps from '../components/Maps'



export default function Mapa () {
  return (
      <Maps
          lat={-34.6037851} lng={-58.381775}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${credentials.apiKey}&libraries=geometry,drawing,places&callback=initMap`}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          loadingElement={<p>Loading...</p>}
      />
  )
}
////lat: -34.6037851, lng: -58.381775