import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import CommunityImg from '../assets/photos/community.jpg';
import SocialImg from '../assets/photos/Social Causes.jpg';

function Featured() {
    const cards = [useAnimation(), useAnimation()];
    const navigate = useNavigate();

    const handleHover = (index) => {
        cards[index].start({ y: "0" });
    }

    const handleHoverEnd = (index) => {
        cards[index].start({ y: "100%" });
    }

    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <div data-scroll data-scroll-section data-scroll-speed="0" className='w-full py-6'>
            <div className="w-full px-20 border-b-[1px] border-zinc-800 pb-12">
                <h1 className='text-8xl tracking-tight'>Featured</h1>
            </div>

            <div className="px-20">
                <div className="cards w-full flex gap-10 mt-8">
                    <motion.div 
                        onHoverStart={() => handleHover(0)} 
                        onHoverEnd={() => handleHoverEnd(0)} 
                        onClick={() => handleClick('/community')} 
                        className="cardcontainer relative w-1/2 h-[75vh] cursor-pointer"
                    >
                        <h1 className='absolute flex left-full -translate-x-1/2 top-1/2 overflow-hidden -translate-y-1/2 z-[9] text-[#fcb900] text-7xl leading-none tracking-tighter font-feature'>
                            {"COMMUNITY".split('').map((item, index) => (
                                <motion.span 
                                    initial={{ y: "100%" }} 
                                    animate={cards[0]} 
                                    transition={{ ease: [0.22, 1, 0.36, 1], delay: index * .06 }} 
                                    className='inline-block' 
                                    key={index}
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </h1>
                        <div className="w-full h-full bg-zinc-200 rounded-xl flex items-center justify-center">
                            <img src={CommunityImg} alt="community" className="w-[75%] h-[75%] object-cover rounded-xl" />
                        </div>
                    </motion.div>

                    <motion.div 
                        onHoverStart={() => handleHover(1)} 
                        onHoverEnd={() => handleHoverEnd(1)} 
                        onClick={() => handleClick('/social')} 
                        className="cardcontainer relative w-1/2 h-[75vh] cursor-pointer"
                    >
                        <h1 className='absolute flex right-full translate-x-1/2 top-1/2 overflow-hidden -translate-y-1/2 z-[9] text-[#fcb900] text-7xl leading-none tracking-tighter font-feature'>
                            {"SOCIAL".split('').map((item, index) => (
                                <motion.span 
                                    initial={{ y: "100%" }} 
                                    animate={cards[1]} 
                                    transition={{ ease: [0.22, 1, 0.36, 1], delay: index * .06 }} 
                                    className='inline-block' 
                                    key={index}
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </h1>
                        <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                            <img src={SocialImg} alt="social" className="w-[75%] h-[75%] object-cover rounded-xl" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Featured;
