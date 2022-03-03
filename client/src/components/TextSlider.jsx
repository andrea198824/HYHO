import React, { useState } from 'react';
import './Btn.css';
import './Btn2.css';
import './TextSlider.css';
import { icons } from './icons';
import { useEffect } from 'react';
import { setTemperaments} from "../actions";
import { useDispatch, useSelector } from "react-redux";



export default function TextSlider({ setTemperamentsSignal,temperamentsSignal}) {
  
  const dispatch = useDispatch()
  var allTemperaments = useSelector((state) => state.allTemperaments);
  var temperaments = useSelector((state) => state.temperaments);
  var breeds = useSelector((state) => state.breeds);




    let [hideOptions, setHideOptions] = useState(false);
    let [reset, setReset] = useState(true);
    let [index, setIndex] = useState(0);
    let [length, setLength] = useState(5);
    let [arr, setArr] = useState([]);
    let [arrToShow, setArrToShow] = useState([]);
    let [selectedItems, setSelecetedItems] = useState([])

    useEffect(() => {
      let temperamentsNames = temperaments.map(e => {
        return e.name
      });
      // // console.log('temperamentsNames',temperamentsNames)
      if (temperaments.length == allTemperaments.length) {
        allTemperaments.map((el) => {
          arr.push({
            temperament: el,
            active: false
          })
        });
      } else {
        allTemperaments.map((el) => {
          arr.push({
            temperament: el,
            active: temperamentsNames.includes(el.name) ? true : false
          })
        });
      }
      // // console.log('arr    :',arr)
      setArr(arr);
      arrToShow = slice(arr, length, index);
      setArrToShow(arrToShow);
      
    },[reset])

    // useEffect(() => {
    //   // console.log('temperaments   :', temperaments)
    //   // console.log('allTemperaments   :', allTemperaments)
    // })




    function slice (arr, length, index) {    
      while (index > arr.length) {
        index = index-arr.length
      }
      while (index < 0) {
        index = index+arr.length
      }
      // index = index > arr.length ? index-arr.length : index
      let newArr = arr.slice(index,index+length)
      if (newArr.length == length) {
        return newArr
      } else {
        return newArr.concat(slice(arr, length-newArr.length, 0))
      }
    }

   function handleBack(e) {
       e.preventDefault();
       --index;
       setIndex(index);
       setHideOptions(true)
       arrToShow = slice(arr, length, index);
       setArrToShow(arrToShow);
   }
   
   function handleNext(e) {
       e.preventDefault();
       ++index;
       setIndex(index);
       setHideOptions(true)
       arrToShow = slice(arr, length, index);
       setArrToShow(arrToShow);
   }

    useEffect(() => {
      setHideOptions(false)
    },[arrToShow])

function handleSelectItems(e) {
  e.preventDefault();
  if (allTemperaments.length == temperaments.length) {
    temperaments = []
  }
  let finded = temperaments.find((el) => 
    el.name == e.target.value
  )
  if (!finded) {
    let elementToPush = allTemperaments.find(el => el.name == e.target.value);
    temperaments.push(elementToPush);
    let elementToSetActive = arr.find(el => el.temperament.name == e.target.value);
    elementToSetActive.active = true;
    setArr(arr)
    arrToShow = slice(arr,length,index)
    setArrToShow(arrToShow)
  } else {
    let elementToEliminate = allTemperaments.find(el => el.name == e.target.value);
    let temperamentsIndex = temperaments.indexOf(elementToEliminate);
    if (temperamentsIndex > -1) {
      temperaments.splice(temperamentsIndex, 1); // 2nd parameter means remove one item only
    }
    let elementToSetActiveFalse = arr.find(el => el.temperament.name == e.target.value);
    elementToSetActiveFalse.active = false;
    setArr(arr)
    arrToShow = slice(arr,length,index)
    setArrToShow(arrToShow)
  }


  if (temperaments.length) {
  } else {
    temperaments = allTemperaments
  }
  dispatch(setTemperaments(temperaments))
  setTemperamentsSignal(!temperamentsSignal)
}

function handleClearAll(e){
  arr = []
  allTemperaments.map((el) => {
    arr.push({
      temperament: el,
      active: false
    })
  });
  temperaments = allTemperaments;
  dispatch(setTemperaments(temperaments))
  setArr(arr)
  arrToShow = slice(arr,length,index)
  setArrToShow(arrToShow)
}

  return (
      <div className='TextSlider'>
              <header className='header'>
                <div>
                <h2>Temperament filter</h2>
                <p>Select temperaments options in the list below</p>  
                </div>
                <button className='Btn2' onClick={e => {handleClearAll(e)}}>Clear selected temperaments</button>
            </header>
            <div className='checkboxOptionsAndBtns'>

                <button className='Btn2'   onClick={e => {handleBack(e)}}>{icons.leftArrow}</button>

                <div className='checkboxOptions'>
                  {
                    !hideOptions &&
                  <div  class="checkboxOptions animated fadeIn">
                  {
                      arrToShow?.map((el) => {
                          return (
                              <button 
                              className={el.active ? 'Btn2-active' :'Btn2'} 
                              key={el.temperament.id} 
                              value={el.temperament.name} 
                              onClick={e => {handleSelectItems(e)}}
                              >
                                  {el.temperament.name}
                              </button>
                          )
                      })
                  }
                  </div>
                  }
  
                </div>
   
                  <button className='Btn2' onClick={e => {handleNext(e)}}>{icons.rightArrow}</button>

            </div>
            {/* <div  class="selectedItems animated fadeIn">
                  {
                      arr?.map((el) => {
                        if (
                          temperaments.length !== allTemperaments.length &&
                          temperaments.includes(el.temperament)
                          ){
                          return (
                            <div className='toEliminate' key={el.temperament.id}>
                                {el.temperament.name}
                                <button
                                className='closeCross' 
                                onClick={e => {handleSelectItems(e)}}
                                key={el.temperament.id} 
                                value={el.temperament.name} 
                                >x</button>
                            </div>
                        )
                        }
 
                      })
                  }
                  </div> */}
                  

      </div>  
    
  )
}
