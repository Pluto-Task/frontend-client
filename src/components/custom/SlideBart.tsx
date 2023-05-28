import React, { useState } from "react";

function Slider(props: any) {
  const { changeCountOfPeople } = props;
  const [value, setValue] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);

  const handleChange = (event: any) => {
    const sliderValue = event.target.value;
    const sliderWidth = event.target.offsetWidth;
    const thumbWidth = 16; // ширина кружечка слайдера
    const percent = (sliderValue / 30) * (sliderWidth - thumbWidth);
    setLeftOffset(percent);
    setValue(sliderValue);
    changeCountOfPeople(sliderValue);
  };

  return (
    <>
      <div className="w-[300px]">
        <div>Кількість людей</div>
        <input
          className="sliderCustom"
          type="range"
          min={1}
          max={30}
          value={value}
          onChange={handleChange}
        />
        <div className="slider-value">{`${value}`}</div>
      </div>
    </>
  );
}

export default Slider;
