import React , {useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Filter from './Filter';
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments, getAllBreeds, setBreeds, setTemperaments} from "../actions";
import CardsSlider from './CardsSlider';
import OrderManagment from './OrderManagment';
import useWindowDimensions from './useWindowDimensions';



export default function Home(props) {


  let search = props.location.search
  let wait = search.includes('?search=') ? true : false
  search = search.includes('?search=') ? search.replace("?search=","") : ''
  let [waitSearch, setWaitSearch] = useState(true);
  // console.log('waitSearch   :',waitSearch)
  // console.log(search)
  const dispatch = useDispatch()

  var allTemperaments = useSelector((state) => state.allTemperaments);
  var allBreeds = useSelector((state) => state.allBreeds);
  var temperaments = useSelector((state) => state.temperaments);
  var breeds = useSelector((state) => state.breeds);


  useEffect(() => {
    // console.log('greeds & temperaments reloaded')
    if (searchWord == '' && breeds.length == 0) {
      dispatch(getAllTemperaments())
      dispatch(getAllBreeds())
    }

}, [])


  let [page, setPage] = useState(1);

  let [Loading, setLoading] = useState(true)

  useEffect(() => {
    Loading = (allTemperaments.length > 0 && allBreeds.length > 0) ? false : true;
    setLoading(Loading);
    })

  let [word, setWord] = useState('');
  let [searchWord, setSearchWord] = useState(search);

  let [filter, setFilter] = useState(false);
  let [filterItem, setFilterItem] = useState(true);
  const showFilter = () => {
    setSidebar(false)
    setFilter(!filter);
  }

  useEffect(() => {
      if (filter && setFilter && filterItem && setFilterItem) {
          
      }
      if (filter) {
          const set = setInterval(() => {
              setFilterItem(!filterItem)
            },1000);
            return () => {
              clearInterval(set);
            }
      } else {
          setFilterItem(!filterItem)
      }
      // console.log('filter changed')

  },[filter])

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    if (filter) {
      showFilter()
    }
    setSidebar(!sidebar)
  };

  function arrayMin(arr) {
    var len = arr.length, min = arr[0];
    while (len--) {
      if (arr[len] < min) {
        min = arr[len];
      }
    }
    return min;
  };
  
  function arrayMax(arr) {
    var len = arr.length, max = arr[0];
    while (len--) {
      if (arr[len] > max) {
        max = arr[len];
      }
    }
    return max;
  };

  function limitFinder (str, parameter) {
    // str should be min or max
    // parameter should be an string equal to weight, height or life_span
    let arr = []
    allBreeds.forEach(el => {
      if (el[parameter]) {
        el[parameter].forEach(el2 => arr.push(el2))
      }
    });
    // console.log('arr    :', arr)

    if (str == 'min'){
      return arrayMin(arr)
    }

    if (str == 'max'){
      return arrayMax(arr)
    }
  }


  let [underLimitHeight, setUnderLimitHeight] = useState(0)
  let [upperLimitHeight, setUpperLimitHeight] = useState(100)
  let [minHeight, setMinHeight] = useState(underLimitHeight);
  let [maxHeight, setMaxHeight] = useState(upperLimitHeight);
  let heightProps = {
    minValue: minHeight, 
    setMinValue: setMinHeight, 
    maxValue: maxHeight, 
    setMaxValue: setMaxHeight,
    underLimit: underLimitHeight,
    upperLimit: upperLimitHeight,
  };

  let [underLimitWeight, setUnderLimitWeight] = useState(0)
  let [upperLimitWeight, setUpperLimitWeight] = useState(100)
  let [minWeight, setMinWeight] = useState(underLimitWeight);
  let [maxWeight, setMaxWeight] = useState(upperLimitWeight);
  let weightProps = {
    minValue: minWeight, 
    setMinValue: setMinWeight, 
    maxValue: maxWeight, 
    setMaxValue: setMaxWeight,
    underLimit: underLimitWeight,
    upperLimit: upperLimitWeight,
  };
  
  let [underLimitLife_Span, setUnderLimitLife_Span] = useState(0)
  let [upperLimitLife_Span, setUpperLimitLife_Span] = useState(100)
  let [minLife_Span, setMinLife_Span] = useState(underLimitLife_Span);
  let [maxLife_Span, setMaxLife_Span] = useState(upperLimitLife_Span);
  let life_SpanProps = {
    minValue: minLife_Span, 
    setMinValue: setMinLife_Span, 
    maxValue: maxLife_Span, 
    setMaxValue: setMaxLife_Span,
    underLimit: underLimitLife_Span,
    upperLimit: upperLimitLife_Span,
  };

  let [order, setOrder] = useState(1);
  let [by, setBy] = useState('name');
  let orderObj = {order, setOrder,by, setBy}

  function orderArray(arr, by, order) {
    order = order ? order : 1;
    return (
          breeds.sort(function(a, b){
            // // console.log("typeof a == 'string'  :",(typeof a[by] == 'string'))
            if (typeof a[by] == 'string' && typeof b[by] == 'string') {
                        if(a[by] < b[by]) { return -order; }
                        if(a[by] > b[by]) { return order; }
                        return 0;
            } else {
                        let a_media = a[by] ? a[by].length == 2 ? (a[by][0]+a[by][1])/2 : a[by][0] : 0;
                        let b_media = b[by] ? b[by].length == 2 ? (b[by][0]+b[by][1])/2 : b[by][0] : 0;
                        if(a_media < b_media) { return order; }
                        if(a_media > b_media) { return -order; }
                        return 0;
            }
  
        })
    )
  }

  useEffect(() => {
      underLimitHeight = limitFinder('min', 'height')
      upperLimitHeight = limitFinder('max', 'height')
      underLimitWeight = limitFinder('min', 'weight')
      upperLimitWeight = limitFinder('max', 'weight')
      underLimitLife_Span = limitFinder('min', 'life_span')
      upperLimitLife_Span = limitFinder('max', 'life_span')

      setUnderLimitHeight(underLimitHeight);
      setUpperLimitHeight(upperLimitHeight);
      setUnderLimitWeight(underLimitWeight);
      setUpperLimitWeight(upperLimitWeight);
      setUnderLimitLife_Span(underLimitLife_Span);
      setUpperLimitLife_Span(upperLimitLife_Span);

      setMinHeight(underLimitHeight);
      setMaxHeight(upperLimitHeight);
      setMinWeight(underLimitWeight);
      setMaxWeight(upperLimitWeight);
      setMinLife_Span(underLimitLife_Span);
      setMaxLife_Span(upperLimitLife_Span);

      // // console.log('underLimitHeight   :', underLimitHeight)
      // // console.log('upperLimitHeight   :', upperLimitHeight)
      // // console.log('underLimitWeight   :', underLimitWeight)
      // // console.log('upperLimitWeight   :', upperLimitWeight)
  },[allBreeds])

  useEffect(() => {
    if (minWeight == upperLimitWeight){
      setMinWeight(maxWeight)
    }
    if (minHeight == upperLimitHeight){
      setMinHeight(maxHeight)
    }
  },[ minWeight , maxWeight , minWeight , maxWeight ])

  function breedsFilter(min, max, property, underLimit, upperLimit){
    let arr = breeds.filter((e) => {
      if (!e[property] && minHeight == underLimit && maxHeight == upperLimit) return true
      if (!e[property]) return false
      if (e[property].length == 1
          && e[property][0] >= min 
          && e[property][0] <= max
         ) return true
      if (e[property].length == 2
          && e[property][0] >= min 
          && e[property][1] <= max
         ) return true
    })
    return arr
  }


  function allMatchingelementArray(array1, array2ToMatchAll) {
    let matches = []
    // Loop for array1
    for(let i = 0; i < array1.length; i++) {
         
        // Loop for array2
        for(let j = 0; j < array2ToMatchAll.length; j++) {
             
            // Compare the element of each and
            // every element from both of the
            // arrays
            if(array1[i].name == array2ToMatchAll[j].name) {
             
                // Push if common element found
                matches.push(true)
            }
        }
    }
    let toReturn = matches.length == array2ToMatchAll.length ? true : false;
    if (toReturn) // console.log('array2ToMatchAll',array2ToMatchAll)
    if (toReturn) // console.log('array1',array1)
    return toReturn;
}

  function findCommonElementName(array1, array2) {
    // Loop for array1
    for(let i = 0; i < array1.length; i++) {
         
        // Loop for array2
        for(let j = 0; j < array2.length; j++) {
             
            // Compare the element of each and
            // every element from both of the
            // arrays
            if(array1[i].name == array2[j].name) {
             
                // Return if common element found
                return true;
            }
        }
    }
     
    // Return if no common element exist
    return false;
}
function breedsFilterByTemperaments(){
  // let temperamentsArr = temperaments.map(e => {return {name: e.name}})
  // // console.log('temperamentsArr    :',temperamentsArr)
  // // console.log('temperaments    :',temperaments)
  // console.log('breedsFilterByTemperaments')
  let arr = breeds.filter((e) => {
    if (!e.temperaments &&
       temperaments.length == allTemperaments.length) return true
    if (!e.temperaments) return
    if (allMatchingelementArray(e.temperaments, temperaments)) return true
  })
  // console.log('arr    :',arr)
  return arr
}

function searchWordFilter (arr, word) {
  if (word == '') return arr
  return arr.filter( e  => e.name.toLowerCase().includes(word.toLowerCase()))
}

let [temperamentsSignal, setTemperamentsSignal] = useState(true)
 useEffect(() => {
   // console.log('useEffect - breeds')
   if (allBreeds.length && allTemperaments.length){
  breeds = allBreeds;
  breeds = breedsFilter(minHeight, maxHeight, 'height',underLimitHeight, upperLimitHeight);
  breeds = breedsFilter(minWeight, maxWeight, 'weight',underLimitWeight, upperLimitWeight);
  breeds = breedsFilter(minLife_Span, maxLife_Span, 'life_span',underLimitLife_Span, upperLimitLife_Span);
  breeds = allTemperaments.length != temperaments.length ? breedsFilterByTemperaments() : breeds;
  breeds = searchWordFilter(breeds, searchWord)
  breeds = orderArray(breeds, by, order)
  page = 1;
  setWaitSearch(false)
  setPage(page);
  dispatch(setBreeds(breeds))
}  
},[
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  minLife_Span,
  maxLife_Span,
  temperaments,
  searchWord,
  temperamentsSignal,
  order,
  by,
])







  return (
  <div >
    <div>
    <NavBar
      showSidebar={showSidebar}
      sidebar={sidebar}
      word={word}
      setWord={setWord}
      searchWord={searchWord}
      setSearchWord={setSearchWord}
     />
    </div>
    <div>
    {
      !Loading &&
     <Filter
      // temperaments={temperaments}
      // setTemperaments={setTemperaments}
      // allTemperaments={allTemperaments}
      filter={filter}
      filterItem={filterItem}
      showFilter={showFilter}
      weightProps={weightProps}
      heightProps={heightProps}
      life_SpanProps={life_SpanProps}
      setTemperamentsSignal = {setTemperamentsSignal}
      temperamentsSignal = {temperamentsSignal}
    />
    }
    </div>
    
    <CardsSlider
    orderObj={orderObj}
    waitSearch={waitSearch}
    searchWord={searchWord}
    setSearchWord={setSearchWord}
    weightProps={weightProps}
    heightProps={heightProps}
    life_SpanProps={life_SpanProps}
    page = {page}
    setPage = {setPage}
    />
    
  </div>
  )
}