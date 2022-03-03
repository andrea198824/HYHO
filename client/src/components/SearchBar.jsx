import React from 'react';
import { useEffect } from 'react';
import './SearchBar.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SearchbarDropdown from './SearchbarDropdown';
import './Btn2.css';
import { useHistory } from 'react-router-dom';


export default function SearchBar({searchWord,setSearchWord,word, setWord}) {

    // // console.log('searchWord     :',searchWord)
    // // console.log('setSearchWord     :',setSearchWord)
    // // console.log('word     :',word)
    // // console.log('setWord     :',setWord)
    
    var allBreeds = useSelector((state) => state.allBreeds);
    let [options, setOptions] = useState([]);
    let array = [1,2,3,3,4,5]

    function handleInput(e) {
        e.preventDefault();
        word = e.target.value;
        let filteredArray;
        if (word == '') {
            options = [];
        } else {
            filteredArray = allBreeds
            .filter(el => el.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
            .slice(0,10);
            // // console.log('filteredArray      :', filteredArray);    
        }

            setWord(word);
            setOptions(filteredArray);


    }

//     useEffect(() => {
//         // console.log('word  :', word);
//         // console.log('options  :', options);
//   })
    const history =  useHistory();
    function handleSearch(e){
        if (setSearchWord) {
            setSearchWord(word)
            setWord('')
            setOptions([])
        } else {
            history.push('/home?search='+word)
        }

    }

  return <div className='SearchBar'>
      <div className='hotizontal'>
      <input className='SearchBarInput' onChange={(e) => {handleInput(e)}} type="text" id="" value={word}/>
    <button className='SearchButton' onClick={handleSearch}>Search breeds</button>
      </div>
      <SearchbarDropdown options={options} setOptions={setOptions} setWord={setWord}/*onInputChange={onInputChange}*/ />   
  </div>;
}
