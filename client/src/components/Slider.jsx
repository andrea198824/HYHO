import React , { useState, useEffect }from 'react';
import './Slider.css';

export default function Slider({title , props}) {
    const {minValue, setMinValue, maxValue, setMaxValue, underLimit, upperLimit} = props;
    const step = 1;
    const gap = 1;
    const [styleProgress, setStyleProgress] = useState({
        left: '0%',
        right: '0%'
      });
    const [typeMinValue, setTypeMinValue] = useState(minValue)
    const [typeMaxValue, setTypeMaxValue] = useState(maxValue)

    useEffect(() => {
        const newStyleProgress = {
            left: ((minValue-underLimit)/(upperLimit-underLimit))*100+'%',
            right:((upperLimit-maxValue)/(upperLimit-underLimit))*100+'%'
        }
        setStyleProgress(newStyleProgress)
    },[minValue, maxValue])

    function handleOnChange(e) {
        let value = parseInt(e.target.value)
        const name = e.target.name
        
        
        if (maxValue - minValue < gap){
            if (name == 'min') {
                value = maxValue - gap;
                setMinValue(value);
                setTypeMinValue(value);
            }
            if (name == 'max') {
                value = minValue + gap;
                setMaxValue(value);
                setTypeMaxValue(value);
            }
        } else {
            if (name == 'min') {
                if (value < maxValue && value >= underLimit) {
                    setMinValue(value);
                    setTypeMinValue(value);
                } else {
                    value = maxValue - gap;
                    setMinValue(value);
                    setTypeMinValue(value);
                }
            }
            if (name == 'max') {
                if (value > minValue) {
                    setMaxValue(value);
                    setTypeMaxValue(value);
                } else {
                    value = minValue + gap;
                    setMaxValue(value);
                    setTypeMaxValue(value);
                }
            }
        }
        // if (name == 'min') {
        //     if (value < maxValue) {
        //         setMinValue(value);
        //     }
        // }
        // if (name == 'max') {
        //     if (value > minValue) {
        //         setMaxValue(value);
        //     }
        // }
        
    }

    async function handleOnChangeInput(e) {
      let value = parseInt(e.target.value)
      const name = e.target.name
      // // console.log('name', name)
      // // console.log('value', value)
      name == 'min' ? setTypeMinValue(value) : setTypeMaxValue(value);
      value = value > upperLimit ? upperLimit : value;
      value = value < underLimit ? underLimit : value;
      e = {target: {
        value,
        name
      }}
      setTimeout(() => {
        handleOnChange(e)
      }, 3000);
    }

  return (
    <div class="wrapper">
      <header>
        <h2>{title} Range</h2>
        <p>Use slider or enter min and max {title.toLowerCase()}</p>
      </header>
      <div class="price-input">
        <div class="field">
          <span>Min</span>
          <input type="number" class="input-min" name='min' onChange={handleOnChangeInput} value={typeMinValue}/>
        </div>
        <div class="separator">-</div>
        <div class="field">
          <span>Max</span>
          <input type="number" class="input-max" name='max' onChange={handleOnChangeInput} value={typeMaxValue}/>
        </div>
      </div>
      <div class="slider">
        <div style={styleProgress} class="progress"></div>
      </div>
      <div className='range-input'>
        <input name='min' type="range" min={underLimit} max={upperLimit} step={step} value={minValue} onChange={handleOnChange}/>
        <input name='max' type="range" min={underLimit} max={upperLimit} step={step} value={maxValue} onChange={handleOnChange}/>
    </div>
    </div>
    );
}
