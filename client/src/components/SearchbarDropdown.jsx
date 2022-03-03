import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import './SeachBarDropDown.css';
import { Link, useHistory } from 'react-router-dom';



export default function SeachBarDropDown({ options, setOptions, setWord }) {

function handleOnClick(e) {
  setWord('')
  setOptions([])
  history.push('/'+e.target.id)
}
const history =  useHistory();
        return (
          <div className='SeachBarDropDown'>
            {
            options?.map((el) => {
              return (
                
                <Link
                to={'/breed/'+el.id}
                  key={el.id}
                  onClick={(e) => {handleOnClick(e)}}
                >
                  {el.name}
                </Link>
              )
            })
            }
          </div>
        ) 
}
