import './mercadopago.css'
import { useEffect, useState } from 'react'
import Checkout from '../components/Checkout'
import axios from 'axios'
//import { getShopCart } from '../store/actions'

function MercadoPago () {

  const [datos, setDatos] = useState('')
 
  useEffect(() => {
    axios
      .get('http://localhost:3001/mercadopago')
      .then(data => {
        setDatos(data.data)
        console.info('Contenido de data:', data)
      })
      .catch(err => console.error(err))
  }, [])


  return (
    <div>
      <button
        className='buttonMP'
        type='button'
        onClick={e => {
          e.preventDefault()
          console.log(global.id)
         // window.location.href = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id= ${global.Id}`
        }}
      >
        Click here if you want to win 1 Million dollars doing nothing at home.
      </button>
    </div>
  )
}

export default MercadoPago
