import React ,{useState, useEffect} from 'react';
import { icons } from './icons';
import { Link } from 'react-router-dom';
import './Filter.css';
import Slider from './Slider';
import TextSlider from './TextSlider';

export default function Filter({showFilter, filter, filterItem,weightProps,heightProps, life_SpanProps,setTemperamentsSignal,temperamentsSignal}) {

    // // console.log(weightProps)
    // // console.log(heightProps)
    
  return (
      <div className={filter ? 'filter active' : 'filter'} >

            <div className={filter ? 'filter active' : 'filter-filter'}>
                {
                filterItem && <div className='filterItems fadeIn'>
                    <div className='filterItemsUp'>
                            <Slider props={weightProps} title={'Height'}/>
                            <Slider props={heightProps} title={'Weight'}/>
                            <Slider props={life_SpanProps} title={'Life Span'}/>
                    </div>
                    <div className='filterItemsDown'>
                            <TextSlider
                            setTemperamentsSignal = {setTemperamentsSignal}
                            temperamentsSignal = {temperamentsSignal}
                            />
                    </div>
                </div> 
                }
            </div>
            <Link className={filter ? 'main-button-filter active' : 'main-button-filter'} onClick={showFilter}>
                {icons.downArrow}
            </Link>
      </div>
      )
}
