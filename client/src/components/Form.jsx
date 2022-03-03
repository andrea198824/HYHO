import React from 'react';
import './Form.css';
import './BtnForm.css';
import { icons } from './icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllBreeds,getAllTemperaments,postBreed, resetStore, setBreeds } from '../actions/index'

export default function Form() {
    const dispatch = useDispatch();
    const history =  useHistory();
//What API requieres:
// const {
//     name, OK Just 
//     highHeight, 
//     highWeight, 
//     lowHeight, 
//     lowWeight, 
//     highLife_span, 
//     lowLife_span, 
//     image,
//     temperament,
//     origin, OK
//     bred_for, OK
//       } = req.body;
var temperaments = useSelector((state) => state.temperaments);
let i = 0;
let [newBreed, setNewBreed] = useState({
    name: {
        index: ++i,
        value: '',
        label: 'Name:',
        placeholder: 'Name.',
    }, 
    origin: {
        index: ++i,
        value: '',
        label: 'Add country origin:',
        placeholder: 'Insert valid countries separated by a comma.',
    },
    bred_for: {
        index: ++i,
        value: '',
        label: 'Bred for:',
        placeholder: 'Insert a brief description.',
    },
    height: {
        index: ++i,
        value: [],
        label: 'Heigh:',
        unit: 'cm',
    }, 
    weight: {
        index: ++i,
        value: [],
        label: 'Weight:',
        unit: 'Kg',
    }, 
    life_span: {
        index: ++i,
        value: [],
        label: 'Life span:',
        unit: 'years',
    }, 
    temperament: {
        index: ++i,
        value: [],
        label: 'Add temperament',
        placeholder: 'Type temperament to add',
    },
    image: {
        index: ++i,
        value: '',
        label: 'Add image URL:',
    },
})

function submitOk() {
    if (newBreed.name.value == ''){
        return false
    }
    if (newBreed.origin.value == ''){
        return false
    }
    if (newBreed.bred_for.value == ''){
        return false
    }
    if (newBreed.height.value == [] ||
        newBreed.height.value[0] == undefined ||
        newBreed.height.value[1] == undefined ||
        newBreed.height.value[0] > newBreed.height.value[1]
        ) {
        return false
    }
    if (newBreed.weight.value == [] ||
        newBreed.weight.value[0] == undefined ||
        newBreed.weight.value[1] == undefined ||
        newBreed.weight.value[0] > newBreed.weight.value[1]
        ) {
        return false
    }
    if (newBreed.life_span.value == [] ||
        newBreed.life_span.value[0] == undefined ||
        newBreed.life_span.value[1] == undefined ||
        newBreed.life_span.value[0] > newBreed.life_span.value[1]
        ) {
        return false
    }
    if (newBreed.temperament.value.length == 0){
        return false
    }
    if (!newBreed.image){
        return false
    }
    // console.log('submitOk()  ===== TRUE ')
    // console.log('newBreed.height.value[0]',newBreed.height.value[0])
    return true
}

let [submitStatus, setSubmitStatus] = useState(false)

useEffect(()=>{
    if (newBreed && newBreed.name.placeholder) {
        setSubmitStatus(submitOk())
    }
},[newBreed])

let [temperamentToAdd, setTemperamentToAdd] = useState('')
function removeItem(arr, item){
    const index = arr.indexOf(item);
    if (index > -1) {
                arr.splice(index, 1); // 2nd parameter means remove one item only
              }
            return arr
        }

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

let [lateralListStatus, setLateralListStatus] = useState(false)
let [showImageDiv, setShowImageDiv] = useState(false)
let [showImage, setShowImage] = useState(false)
let [showImageSet, setShowImageSet] = useState(false)

useEffect(() => {
    if (showImageDiv ==  showImage && newBreed.image.value == '') {
        return 
    }
    if  (showImageSet) {
        setShowImageDiv(true)
        const set = setInterval(() => {
            setShowImage(true)
          },1000);
          return () => {
            clearInterval(set);
          }
    } 
    if (!showImageSet) {
        setShowImage(false)
        const set = setInterval(() => {
            setShowImageDiv(false)
          },1000);
          return () => {
            clearInterval(set);
          }
    } 
    // else {
    //     setShowImage(!showImage)
    // }
    // console.log('filter changed')

},[showImageSet])

 function imagePreview(e) {
    e.preventDefault()
    if (showImage == showImageDiv) {
        setShowImageSet(!showImageSet);
    }
    
}
    
useEffect(() => {
    // console.log('useEffect // newBreed       :',newBreed)
},[newBreed])

function handleOnChange(e) {
    let {name , value} = e.target
    let toReturn = newBreed[[name]]
    if (name == 'name' && testWords(value) ) {
        toReturn.value = capitalizeFirstLetter(value);
        setNewBreed({
            ...newBreed,
            [name]: toReturn
    })
    }
    if ((name == 'bred_for' || name == 'origin') && testSentence(value) && !nextToNext(value,',') && !nextToNext(value,'.') && !nextToNext(value,' ')) {
        toReturn.value = capitalizeFirstLetter(value);
        setNewBreed({
            ...newBreed,
            [name]: toReturn
    })}
    if (name == 'image') {
        toReturn.value = value;
        setNewBreed({
            ...newBreed,
            [name]: toReturn
    })

    }
 }

function handleOnChangeArray(e) {
    let {name , value , placeholder} = e.target


    if (!isNaN(value)) {
        let toReturn = newBreed[[name]]
        if (placeholder == 'min') {
            toReturn.value[0] = parseFloat(value);
        } else {
            toReturn.value[1] = parseFloat(value);
        }
        setNewBreed({
            ...newBreed,
            [name]: toReturn
    })  
    }
}

function handleOnChangeTemperamentToAdd(e) {
    let {value} = e.target
    if (testSentence(value) && !value.includes(',') && !value.includes('.') && (value.match(/ /g) || []).length <= 1){
        temperamentToAdd = capitalizeFirstLetter(value)
        setTemperamentToAdd(temperamentToAdd)
    }
    
}

function handleTemperaments(e) {
e.preventDefault()
let {name , value} = e.target
if (value) {
    let toReturn = newBreed[['temperament']]
    const index = toReturn.value.indexOf(value);
    if (index > -1) {
        toReturn.value.splice(index, 1); // 2nd parameter means remove one item only
    } else {
        toReturn.value.push(value);
    }            
    setTemperamentToAdd('')
    setNewBreed({
        ...newBreed,
        ['temperament']: toReturn
    })   
    
}
}

function handleSubmit(e) {
    let toPost = {
    name: newBreed.name.value,
    height: newBreed.height.value,
    weight: newBreed.weight.value,
    life_span: newBreed.life_span.value,
    image: newBreed.image.value,
    temperament: newBreed.temperament.value,
    origin: newBreed.origin.value,
    bred_for: newBreed.bred_for.value,
}
if (false) {
    alert("this is an alert")
} else {
    try {
        dispatch(postBreed(toPost))
        setNewBreed({
            name: {
                index: ++i,
                value: '',
                label: 'Name:',
                placeholder: 'Name.',
            }, 
            origin: {
                index: ++i,
                value: '',
                label: 'Add country origin:',
                placeholder: 'Insert valid countries separated by a comma.',
            },
            bred_for: {
                index: ++i,
                value: '',
                label: 'Bred for:',
                placeholder: 'Insert a brief description.',
            },
            height: {
                index: ++i,
                value: [],
                label: 'Heigh:',
                unit: 'cm',
            }, 
            weight: {
                index: ++i,
                value: [],
                label: 'Weight:',
                unit: 'Kg',
            }, 
            life_span: {
                index: ++i,
                value: [],
                label: 'Life span:',
                unit: 'years',
            }, 
            temperament: {
                index: ++i,
                value: [],
                label: 'Add temperament',
                placeholder: 'Type temperament to add',
            },
            image: {
                index: ++i,
                value: '',
                label: 'Add image URL:',
            },
        })
        dispatch(resetStore([]))
        history.push('/home')
    } catch (err) {
        alert(err)
    }
}


}


//Type checks:
function testWords(str){    //name => name, temperament
    return  /^[a-zA-Z]*$/.test(str) 
}

function testSentence(str){  //name => bred_for, add_country
    return  /^[\.a-zA-Z,,. ]*$/.test(str)
}

function testNumber(str){
    return  /^\d+$/.test(str)
}

function nextToNext(str, ref) {
    for (var i = 1; i < str.length; i++) {
      if (str[i] === str[i-1] && str[i-1] == ref) {
        return true
      }
  }
  return false
}

function seeTemperamentsOptions(e) {
    e.preventDefault();
    setLateralListStatus(!lateralListStatus)
}

  return   (
    <form className='Form'>
            <div className='FormContainer'>
                    <header className='header'>
                    <div>
                    <h2 className='header'>Add breed</h2> 
                    </div>   
                </header>
                <div className='formWrapper'>
                    {
                        Object.keys(newBreed)?.map(e => {
                            if (e != 'image' && e != 'temperament' && !newBreed[e].unit) {
                                return (
                                    <div
                                    className='inputLabel'>
                                    <label className='labelForm'>
                                        {newBreed[e].label}
                                    </label>
                                        <input
                                            className='input'
                                            type='text'
                                            value={newBreed[e].value}
                                            placeholder={newBreed[e].placeholder}
                                            name={e}
                                            onChange={handleOnChange}
                                        ></input>
                                    </div>
                                )
                            }
                            if (e != 'image' && e != 'temperament' && newBreed[e].unit) {
                                return (
                                    <div
                                    className='inputLabel'>
                                    <label className='labelForm'>
                                        {newBreed[e].label}
                                    </label>
                                        <input
                                            className='input'
                                            type='number'
                                            value={newBreed[e].value[0]}
                                            placeholder={'min'}
                                            name={e}
                                            onChange={handleOnChangeArray}
                                            ></input>
                                            <label className='medium labelForm'>
                                                {' to '}
                                            </label>
                                        <input
                                            className='input'
                                            type='number'
                                            value={newBreed[e].value[1]}
                                            placeholder={'max'}
                                            name={e}
                                            onChange={handleOnChangeArray}
                                        ></input>
                                            <label className='end labelForm'>
                                                {newBreed[e].unit}
                                            </label>
                                        
                                    </div>
                                )
                            }
                            if (e == 'temperament') {
                                return (
                                    <div className='inputLabelImg'>
                                        <div
                                        className='inputLabel'>
                                        <label className='labelForm'>
                                            {newBreed[e].label}
                                        </label>
                                            <input
                                                className='input'
                                                type='text'
                                                value={temperamentToAdd}
                                                placeholder={newBreed[e].placeholder}
                                                name={e}
                                                onChange={handleOnChangeTemperamentToAdd}
                                            ></input>
                                            <button className='BtnForm' value={temperamentToAdd} name={e} onClick={handleTemperaments}>Add typed temperament</button>
                                            <button className='BtnForm' value={temperamentToAdd} name={e} onClick={seeTemperamentsOptions}>Show temperaments in database</button>
                                    </div>
                                    {
                                    newBreed[e].value.length > 0 &&
                                    <div className='temperamentsListAndLabel'>
                                    <label className='labelForm'>
                                    Added temperaments:
                                    </label>
                                    <ul className='temperamentsList'>
                                        {
                                            newBreed[e].value.map(temperament => {
                                                return (
                                                    <li className='temperamentItem'>
                                                        <label className='labelForm'>{temperament}</label>
                                                        <button className='BtnForm' value={temperament} name={e} onClick={handleTemperaments}>x</button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    </div>
                                    }
                            <div className={lateralListStatus ? 'lateralList active' : 'lateralList'}>
                            <button to='#' className='menu-bars' onClick={seeTemperamentsOptions}>
                                    {icons.close}
                                </button>
                            
                                <div className='list'>
                                {
                                        temperaments?.map(e => {
                                            return <button className='buttonList' value={e.name} id={e.id} name={'temperament'} onClick={handleTemperaments}>{e.name}</button>
                                        })
                                    }
                                </div>

                            </div>
                            

                    </div>
                        )
                            }
                            if (e == 'image') {
                                return (
                                    <div
                                    className='inputLabelAndImage'>
                                        <div className='inputLabel'>
                                        <label className='labelForm'>
                                        {newBreed[e].label}
                                    </label>
                                        <input
                                            className='input'
                                            type='text'
                                            value={newBreed[e].value}
                                            placeholder={newBreed[e].placeholder}
                                            name={e}
                                            onChange={handleOnChange}
                                        ></input>
                                        <button disabled={newBreed[e].value == ''} className='BtnForm' value={temperamentToAdd} name={e} onClick={imagePreview}>Image preview</button>
                                        </div>
                                        <div 
                                        // hidden={!showImageDiv}
                                        className={
                                            newBreed[e].value != '' && showImageDiv ? 
                                                'imageDiv active' : 
                                                'imageDiv'
                                                }>
                                            <img
                                            
                                            className={
                                                newBreed[e].value != '' && showImage ? 
                                                    'image  active' : 
                                                    'image '}
                                            src={newBreed[e].value} 
                                            />
                                        </div>
                                    </div>
                                )
                            }
                })
            }
            <div className='createButtonDiv'>
            <button className='createButton' onClick={handleSubmit} disabled={!submitStatus}>Create breed</button>
                </div>   
                    </div>
        </div>   
</form> )
}
