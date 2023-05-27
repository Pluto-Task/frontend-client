import React, { useState } from 'react';

function Slider() {
  const [value, setValue] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);

  const handleChange = (event) => {
    const sliderValue = event.target.value;
    const sliderWidth = event.target.offsetWidth;
    const thumbWidth = 16; // ширина кружечка слайдера
    const percent = (sliderValue / 30)  * (sliderWidth - thumbWidth);
    setLeftOffset(percent);
    setValue(sliderValue);
  };

  return (
    <>
    <div className="slider-container">
      <input
      className='sliderCustom'
        type="range"
        min={1}
        max={30}
        value={value}
        onChange={handleChange}
      />
      <div
        className="slider-value"
        style={{ left: `${leftOffset}px` }}
      >{`${value}`}</div>
    </div>
    <div className="flex mt-[5%] ">
        <p>1{`<`}</p>
        <p className="ml-[auto]">{`>`}30</p>
    </div>
    </>
  );
}

export default Slider;