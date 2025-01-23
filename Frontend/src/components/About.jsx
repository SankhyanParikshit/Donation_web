import React from 'react'
import kido from '../assets/photos/kido.jpg'
import { FaArrowUp } from "react-icons/fa6";

function About() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.1" className='w-full p-20 bg-[#411F1F] rounded-tl-3xl rounded-tr-3xl text-black'>
      <h1 className='font-[] text-[3vw] leading-[3.5vw] tracking-tight'>
        Heals, we are dedicated to making a positive impact on the world. We specialize in raising funds to support those in need, provide food for the hungry, and protect our natural environment. By partnering with generous individuals and organizations, we aim to create a ripple effect of kindness and sustainability. Join us in our mission to help others and heal the planet, one contribution at a time.
      </h1>
      <div className="w-full flex gap-5 border-t-[2px] pt-10 mt-20 border-[#271212]">
        <div className="w-1/2  ">
          <h1 className='text-[5vw] font-navbar leading-[1.2]'>make the change today:</h1>
          <button className='uppercase flex gap-10 items-center px-6 py-5 bg-zinc-900 rounded-full text-white mt-10'>Read More
            <div className="flex items-center justify-center w-8 h-8 border-[2px] border-zinc-500 rounded-full">
              <span className="rotate-45">
                <FaArrowUp />
              </span>
            </div>
          </button>
        </div>
        <div className="w-1/2 h-[60vh] bg-cover bg-center rounded-3xl" style={{ backgroundImage: `url(${kido})` }}>
        </div>
      </div>
    </div>
  )
}

export default About
