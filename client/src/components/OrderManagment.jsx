import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBreeds } from '../actions';
import './Btn2.css';
import './OrderManagment.css';
import { icons } from './icons';




export default function OrderManagment({orderObj}) {
    let breeds = useSelector((state) => state.breeds);
    let dispatch = useDispatch();
    let {order, setOrder, by, setBy} = orderObj
    



    // useEffect(() => {
    //     let arr = orderArray(breeds, by, order)
    //     dispatch(setBreeds(arr))
    // })

    function handleOrder(e) {
        // let {order, setOrder} = orderObj
        e.preventDefault();
        let { value } = e.target;
        order = -order;
        setOrder(order);        
    }
    
    function handleBy(e) {
        // let {by, setBy} = orderObj
        e.preventDefault();
        let { value } = e.target;
        by = value;
        setBy(by);        
    }
// console.log('by :',by)
  return (
    <div className='OrderManagment'>
        <button onClick={handleOrder} className={'Btn2'}>{order == 1 ? icons.downArrow : icons.upArrow}</button>
        <div className='buttonWrapper'>
        <button 
        onClick={handleBy} 
        className={by == 'name' ? 'Btn2-active' : 'Btn2'} 
        value={'name'}
        >
          By name
        </button>
        <button 
        onClick={handleBy} 
        className={by == 'life_span' ? 'Btn2-active' : 'Btn2'}
         value={'life_span'}
        >
          By life span
        </button>
        <button 
        onClick={handleBy} 
        className={by == 'height' ? 'Btn2-active' : 'Btn2'} 
        value={'height'}
        >
          By height
        </button>
        <button 
        onClick={handleBy} 
        className={by == 'weight' ? 'Btn2-active' : 'Btn2'} 
        value={'weight'}
        >
          By weight
        </button>
        </div>
    </div>
  )
}
