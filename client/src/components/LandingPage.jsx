import React from 'react';
import { Link } from 'react-router-dom';
import dog2 from "./images/landingPage/dogs-transparent-background-2.png"
import dog22 from "./images/landingPage/dogs-transparent-background-22.png"
import dog23 from "./images/landingPage/dogs-transparent-background-23.png"
import dog24 from "./images/landingPage/dogs-transparent-background-24.png"
import dog14 from "./images/landingPage/dogs-transparent-background-14.png"
import dog15 from "./images/landingPage/dogs-transparent-background-15.png"
import { useState } from 'react';
import { useEffect } from 'react';
import './colours.css';
import './LandingPage.css';


export default function LandingPage() {
  let dogs = [
    dog2,
    dog22,
    dog23,
    dog24,
    dog14,
    dog15,
  ];
  var dog = dogs[Math.floor(Math.random()*dogs.length)];
  let [loaded, setLoaded] = useState(false)
  let [image, setImage] = useState(dog)
  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
    }
  },[loaded])



  return <div className='LadingPage'>
    <div className={loaded ? 'leftSideLP active' : 'leftSideLP'}>
      <div className='startButtonContainer'>
     <Link className='startButton' to='/home'>Welcome!</Link>
      </div>

      <img  className={'imageLandingPage'} src={image} alt="" />
    </div>
</div>;
}
