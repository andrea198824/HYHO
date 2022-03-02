import React from 'react'
import { Link } from 'react-router-dom'
import style from './Card.module.css'

function productCard({ img, name, cont, cca3, popu }) {

    return (
        <div className={style.card}>
            <Link to={`/details/${cca3}`}>
                <div className={style.pic}>
                    <img src={img} alt='img' width='90px' height='64.8x' />
                </div>
                <div className={style.text} >
                    <h2 >{name}</h2>
                    <h2 >{cont}</h2>

                </div>
            </Link>
        </div>
    )
}
export default productCard