import React from 'react'
import { motion } from 'framer-motion'

function Marquee() {
  
  return (
    <div  className='w-full  py-20 rounded-tl-3xl rounded-tr-3xl bg-[#004D42]'>
      <div className="text border-t-2 border-b-2 border-zinc-300 flex whitespace-nowrap overflow-hidden">
        <motion.h1 initial-={{x:"0"}} animate={{x: "-100%"}} transition={{ repeat:Infinity ,ease:"linear" ,duration:8}} className='text-[10vw] leading-none font-marquee font-semibold p-10 text-white	'>Help Those in Need Today*</motion.h1>
        <motion.h1 initial-={{x:"0"}} animate={{x: "-100%"}} transition={{ repeat:Infinity ,ease:"linear" ,duration:8}} className='text-[10vw] leading-none font-marquee font-semibold p-10 text-white	'>Help Those in Need Today*</motion.h1>
      </div>
    </div>
  )
}

export default Marquee
