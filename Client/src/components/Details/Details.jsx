import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { filterById } from '../actions'
import style from './Details.module.css'

function Details(props) {

	let detail = ''

	const navigate = useNavigate()

	const product = useParams('/details/:ID')

	const dispatch = useDispatch()

	const productById = useSelector(state => state.productById)

	const hunddleClick = (e) => {
		e.preventDefault()
		navigate('/home')
    }

	useEffect(() => {
		dispatch(filterById(product.ID))
	}, [dispatch])

	if (countryById !== undefined) {
		detail = productById
	}

	return (
		<div className={style.cnt}>
			<div className={style.item0} >
				<h1>{detail.name}</h1>
				<img src={detail.img} alt='img' width='216px' height='144px' />
			</div>

			<div className={style.item1}>
				{detail.name}
				{detail.capital?.slice(1, -1)}
				{detail.population}
				{detail.area}
				{detail.continents}
				{detail.ID}
				{detail.subregion?.length > 0 ? <label> y ocupa una subregion en {detail.subregion} </label> : <label>{detail.subregion?.length} </label>}
				{detail.T_Activities?.length > 0 ? <label> y en sus actividades turisticas se incluye:
					{detail.T_Activities?.map(el => <label> {el.name}</label>)}</label> : <label></label>}
			</div>
			<div className={style.item2}>
				<button onClick={(e) => hunddleClick(e)}>Volver</button>
			</div>

		</div>
	)
}
export default Details