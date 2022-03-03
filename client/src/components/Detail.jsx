import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useState } from 'react';
import './Detail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBreeds, getAllTemperaments, getDetail } from '../actions';
import dog from "./images/dog-silhouette.png"
import man from "./images/man-silhouette.png"
import { icons } from './icons';

export default function Detail() {

  
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar)
  };

  let [word, setWord] = useState('');
  let [heightRatio, setHeightRatio] = useState(null)

  //Details
  let { id } = useParams();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getDetail(id))
}, [dispatch])

useEffect(()=>{
  dispatch(getDetail(id))
}, [id])

useEffect(()=>{
  dispatch(getAllTemperaments())
}, [])

useEffect(()=>{
  dispatch(getAllBreeds())
}, [])


useEffect(()=>{
  // console.log('media getted')
  
  if (detail.height?.length) {
    // console.log('media(detail.height)',media(detail.height))
    // console.log('media(detail.height)/170',media(detail.height)/170)
    setHeightRatio(media(detail.height)/170)    
  }
})

function media(arr) {
  const mid = Math.floor(arr.length / 2),
  nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;  
}

const detail = useSelector((state) => state.details);

  return (
    <div>
    <div>
    <NavBar
      showSidebar={showSidebar}
      sidebar={sidebar}
      word={word}
      setWord={setWord}
     />
    </div>

    {
                  !detail && !!detail.name  &&
                  <div >
                          <div className='loadingDetail'>
                            <div>
                                {icons.loading}
                            </div>
                          </div>
                  </div>

                }
                    {
                  id != detail.id  &&
                  <div >
                          <div className='loadingDetail'>
                          <div>
                                {icons.loading}
                            </div>
                          </div>
                  </div>

                }
    {
      detail && detail.name && id == detail.id &&
        <div className='DetailContainer'>
              <div className='Detail'>

                  <img className='imgDetail' src={detail.image} alt="" />
        <div className='rightSide'>

                <div className='info'>
                  <h2>{detail.name}</h2>
                  {
                    !detail.life_span &&
                    <h5>Life span: No data</h5>
                  }
                  {
                    detail.life_span.length == 1 &&
                    <h5>Life span: {detail.life_span[0]} years.</h5>
                  }
                  {
                    detail.life_span.length == 2 &&
                    <h5>Life span: Between {detail.life_span[0]} and {detail.life_span[1]} years.</h5>
                  }
                  <div></div>
                  {/* Weight */}
                  {
                    !detail.weight &&
                    <h5>Weight: No data</h5>
                  }
                  {
                    detail.weight.length == 1 &&
                    <h5>Weight: {detail.weight[0]} kilos.</h5>
                  }
                  {
                    detail.weight.length == 2 &&
                    <h5>Weight: Between {detail.weight[0]} and {detail.weight[1]} kilos.</h5>
                  }
                  <div></div>
                  {/* Height */}
                  {
                    !detail.height &&
                    <h5>Height: No data</h5>
                  }
                  {
                    detail.height.length == 1 &&
                    <h5>Height: {detail.height[0]} centimeters.</h5>
                  } 
                  {
                    detail.height.length == 2 &&
                    <h5>Height: Between {detail.height[0]} and {detail.height[1]} centimeters.</h5>
                  }
                  {/* Origin */}
                  {
                    !detail.origin &&
                    <h5>Origin: No data</h5>
                  }
                  {
                    detail.origin &&
                    <h5>Origin: {detail.origin}</h5>
                  }
                  {/* Bred for */}
                  {
                    !detail.bred_for &&
                    <h5>Bred for: No data</h5>
                  }
                  {
                    detail.bred_for &&
                    <h5>Bred for: {detail.bred_for}</h5>
                  }
                </div>
                {
                  heightRatio &&
                    <div className='comparison'>
                      <img src={man} className='comparisonItem' style={{height: 170+'px'}} alt="" />
                      <img src={dog} className='comparisonItem' style={{height: heightRatio*170+'px'}} alt="" />
                    </div>
                }
        </div>
              </div>
        </div>
    }

    
    </div>
  );
}
