import React from 'react';
import './Btn2.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MdSecurityUpdateGood } from 'react-icons/md';


export default function Paginado({hideOptions,length,page,setPage,setHideOptions}) {
    var breeds = useSelector((state) => state.breeds);
    let [arr, setArr] = useState([1]);

    useEffect(() => {
        arr = []
        for (let i = 1; i <= Math.ceil(breeds.length/length); i++) {
            arr.push(i)            
        }
        setArr(arr)
        // // console.log('arr / Paginado:', arr)
    },[breeds])
    
    function handleSelectItems(e) {
        e.preventDefault();
        page = e.target.value;
        setPage(page);
        // setHideOptions(true)
    }

  return (
    <div className=''>
    {
      !hideOptions &&
    <div  class="checkboxOptions animated fadeIn">
    {
        arr?.map((el) => {
            return (
                <button 
                className={el == page ? 'Btn2-active' :'Btn2'} 
                key={el} 
                value={el} 
                onClick={e => {handleSelectItems(e)}}
                >
                    {el}
                </button>
            )
        })
    }
    </div>
    }

  </div>
  )
}
