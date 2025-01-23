import React, { useEffect, useState } from "react";
import helpo from "../assets/photos/helpo.jpg";

function Eyes() {

  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    window.addEventListener("mousemove",(e)=> {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    })
  })

  return (
    <div className="eyes w-full h-screen overflow-hidden">
      <div data-scroll data-scroll-speed="-.6"
        className="relative w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${helpo})` }}
      >
        <div className="absolute  flex gap-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   ">
          <div className="flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100">
            <div className="flex items-center justify-center w-[12vw] h-[12vw] rounded-full bg-zinc-900 relative">
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[2vw] text-white">HELP</h1>
              <div
                style={{ transform: `translate(-50% ,-50%) rotate(${rotate}deg)` }}
                className="line w-full h-8 absolute top-1/2 left-1/2"
              >
                <div className="w-[2vw] h-[2vw] rounded-full bg-zinc-100"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100">
            <div className="flex items-center justify-center w-[12vw] h-[12vw] rounded-full bg-zinc-900 relative">
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[2vw] text-white">HELP</h1>
              <div
                style={{ transform: `translate(-50% ,-50%) rotate(${rotate}deg)` }}
                className="line w-full h-8 absolute top-1/2 left-1/2"
              >
                <div className="w-[2vw] h-[2vw] rounded-full bg-zinc-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eyes;
