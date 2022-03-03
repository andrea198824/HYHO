import React from 'react'
import { Link } from 'react-router-dom'
import style from './Card.module.css'

//Componente CARD
//img: Imagen del producto
//name: Nombre del producto
//des: descripcón corta
//La imagen posee un link que llevaría a la página del producto en si.
//En esta página, habria una descripción general del producto.

function countryCard({img, name, des}) {
   
    return (
        <div className={style.card}>
            <Link to={`/details/${cca3}`}>
                <div className={style.pic}>
                    <img src={img} alt='img' width='90px' height='64.8x' />
                </div>
                <div className={style.text} >
                    <h2 >{name}</h2>
                    <h2 >{des}</h2>
                </div>
            </Link>
        </div>
        )
}
export default countryCard