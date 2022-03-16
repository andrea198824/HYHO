import React from 'react'
import credentials from '../credentials'
import Maps from '../components/Maps'

export default function Mapa () {
  return (
    <Maps
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${credentials.apiKey}`}
      containerElement={<div style={{ height: '400px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      loadingElement={<p>Loading...</p>}
    />
  )
}
