import React, { useState } from 'react';
import './Btn.css';
import './Btn2.css';
import './CardsSlider.css';
import { icons } from './icons';
import { useEffect } from 'react';
import { setTemperaments} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Paginado from './Paginado';
import Card from './Card';
import { Link } from 'react-router-dom';
import OrderManagment from './OrderManagment';

export default function CardsSlider({orderObj,waitSearch,searchWord,setSearchWord,weightProps, heightProps, life_SpanProps,page, setPage}) {
  
  const dispatch = useDispatch()
  var allTemperaments = useSelector((state) => state.allTemperaments);
  var temperaments = useSelector((state) => state.temperaments);
  var breeds = useSelector((state) => state.breeds);
  var allBreeds = useSelector((state) => state.allBreeds);



    let [hideOptions, setHideOptions] = useState(false);
    // let [page, setPage] = useState(1);
    let [length, setLength] = useState(9);
    let [arrToShow, setArrToShow] = useState([]);
    let [selectedItems, setSelecetedItems] = useState([])

    function managePage(arr, page, cards) {
      return arr.slice((page-1)*cards, page*cards)
    }

    useEffect(() => {
      arrToShow = managePage(breeds,page,length)
      setArrToShow(arrToShow);    
    },[breeds, page])

    useEffect(() => {
      setPage(1)    
    },[breeds])


    // useEffect(() => {
    //   arrToShow = slice(arr, length, index);
    //   setArrToShow(arrToShow);      
    // },[arr])


    // function slice (arr, length, index) {    
    //   while (index > arr.length) {
    //     index = index-arr.length
    //   }
    //   while (index < 0) {
    //     index = index+arr.length
    //   }
    //   return arr.slice(index,index+length)
    // }
    useEffect(() => {
      // setTimeout(() => {
        setHideOptions(false)
      // }, 500);
      // setHideOptions(false)
    },[arrToShow])

   function handleBack(e) {
       e.preventDefault();
       --page;
       setPage(page);
      //  setHideOptions(true)
      //  arrToShow = slice(arr, length, index);
      //  setArrToShow(arrToShow);
   }
   
   function handleNext(e) {
       e.preventDefault();
       ++page;
       setPage(page);
      //  setHideOptions(true)
      //  arrToShow = slice(arr, length, index);
      //  setArrToShow(arrToShow);
   }

   function removeSearchWord(e) {
     searchWord = '';
     setSearchWord(searchWord)
   }


  return (
      <div className='CardsSlider'>
                        <OrderManagment
                orderObj={orderObj}/>
<header className='header'>
            <h1>Breeds</h1>
</header>
            {
              !hideOptions && !!(allBreeds.length) &&  !waitSearch &&
              <div className='CardsSliderContainer' hidden={breeds.length ? false : true}>
              <header className='header'>
                <div>

                
                </div>
                {
                 searchWord!='' &&
                 <div className='spanMatch' >
                   <span >{searchWord}</span>
                   <button className='closeButton' onClick={removeSearchWord}>{icons.close}</button>
                 </div>
                }
                
              </header>
              
              <div className='paginadoWrapper'>
              <button className='Btn2 cardSlider' disabled={page != 1 ? false: true} onClick={e => {handleBack(e)}}>{icons.leftArrow}</button>
              <Paginado
                hideOptions={hideOptions}
                length={length}
                page={page}
                setPage={setPage}
                setHideOptions={setHideOptions}
                ></Paginado>
              <button className='Btn2 cardSlider' disabled={page != Math.ceil(breeds.length/length) ? false: true} onClick={e => {handleNext(e)}}>{icons.rightArrow}</button>
              </div>

              <div className='checkboxOptionsAndBtns'>
         
                
              
                
                <div className='cardsContainer'>
                  {
                    !hideOptions &&
                  <div  class="grid animated fadeIn">
                  {
                      arrToShow?.map((el) => {
                          return (
                              <Card
                              el={el} 
                              weightProps={weightProps}
                              heightProps={heightProps}
                              life_SpanProps={life_SpanProps}
                              >      
                              </Card>
                          )
                      })
                  }
                  </div>
                  }
  
                </div>
                
       
            </div>
            <div className='paginadoWrapper'>
            <button className='Btn2 cardSlider' disabled={page != 1 ? false: true} onClick={e => {handleBack(e)}}>{icons.leftArrow}</button>
            <Paginado
              hideOptions={hideOptions}
              length={length}
              page={page}
              setPage={setPage}
              ></Paginado>
            <button className='Btn2 cardSlider' disabled={page != Math.ceil(breeds.length/length) ? false: true} onClick={e => {handleNext(e)}}>{icons.rightArrow}</button>
            </div>
              </div>
            }

                {/* <div className='loading' hidden={breeds ? false : true}>
                {icons.loading}
                </div> */}
              
              {
                waitSearch &&
                <div className='loading' hidden={breeds ? false : true}>
                {icons.loading}
                </div>
              }
              
                {
                  !breeds.length && !!allBreeds.length &&
                  <span className='loading' hidden={breeds.length ? false : true}>
                  No matches found
                  </span>
                }

              

      </div>  
    
  )
}
