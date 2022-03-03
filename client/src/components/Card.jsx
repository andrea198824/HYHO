import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';


export default function Card({el,weightProps, heightProps, life_SpanProps}) {
  return <Link to={'/breed/'+el.id} className='Card'>
    <img className='img' src={el.image} alt="" />
      <h2>{el.name}</h2>
      <div></div>
    {/* Life span */}
    {
      !el.life_span &&
      <h3 className='infoCard'>Life span: No data</h3>
    }
    {
      el.life_span.length == 1 &&
      <h3 className='infoCard'>Life span: {el.life_span[0]} years.</h3>
    }
    {
      el.life_span.length == 2 &&
      <h3 className='infoCard'>Life span: Between {el.life_span[0]} and {el.life_span[1]} years.</h3>
    }
    <div></div>
    {/* Weight */}
    {
      !el.weight &&
      <h3 className='infoCard'>Weight: No data</h3>
    }
    {
      el.weight.length == 1 &&
      <h3 className='infoCard'>Weight: {el.weight[0]} kilos.</h3>
    }
    {
      el.weight.length == 2 &&
      <h3 className='infoCard'>Weight: Between {el.weight[0]} and {el.weight[1]} kilos.</h3>
    }
    <div></div>
    {/* Height */}
    {
      !el.height &&
      <h3 className='infoCard'>Height: No data</h3>
    }
    {
      el.height.length == 1 &&
      <h3 className='infoCard'>Height: {el.height[0]} meters.</h3>
    }
    {
      el.height.length == 2 &&
      <h3 className='infoCard'>Height: Between {el.height[0]} and {el.height[1]} meters.</h3>
    }
    {
      el.id &&
      <h3 className='infoCard'>ID: {el.id}</h3>
    }
  </Link>;
}
