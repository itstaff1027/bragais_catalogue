import React, { useState, useEffect } from "react";


function ImageSlider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);


  const slideNext = () => {
    setActiveIndex((val) => {
      if (val == children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };
 
  return (
    <div className="flex items-center justify-center relative w-full bg-white h-80 rounded-xl">
      <div className="flex items-center justify-between absolute w-full h-72 text-black">
        <button onClick={(e) => {
          e.preventDefault();
          slidePrev()
        }} className="p-2 text-xl z-10 w-16 h-72 hover:bg-slate-400/50 hover:text-white hover:rounded-l-xl duration-300">
          {"<"}
        </button>
        <button onClick={(e) => {
          e.preventDefault();
          slideNext();
        }} className="p-2 text-xl z-10 w-16 h-72 hover:bg-slate-400/50 hover:text-white hover:rounded-r-xl duration-300">
          {">"}
        </button>
      </div>
      {children.map((item, index) => {
        return (
          <div className={`absolute transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`} key={index}>
            {item}
          </div>
        )
      })} 
    </div>

  );
}

export default ImageSlider;
