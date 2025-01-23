import React, { useState, useEffect } from 'react';
import { FaArrowDown } from "react-icons/fa6";
import '../style/landingpage.scss';
import { motion } from 'framer-motion';

function LandingPage() {

    const [isVisible, setIsVisible] = useState(true);

    const scrollToSection = () => {
        const element = document.getElementById('target-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsVisible(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div data-scroll data-scroll-section data-scroll-speed=".05" className='w-full bg-white relative'>
            <div className="textstructure mt-8 px-20">
                {["WE EMPOWER", "WORTHY", "INITIATIVES"].map((item, index) => {
                    return (
                        <div className="masker" key={index}>
                            <div className='w-fit flex item-end overflow-hidden'>
                                {index === 1 && (<motion.div initial={{ width: 0 }} animate={{ width: "12vw" }} transition={{ ease: [0, 0.55, 0.45, 1], duration: 1 }} className='mr-4 w-[12vw] h-[7vw] rounded-md relative top-[.4vw] bg-red-500'></motion.div>)}
                                <h1 className='text-[6.8vw] leading-[1.2] tracking-tighter font-landing'>{item}</h1>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="border-t-[1px] border-zinc-800 mt-10 flex justify-between items-center py-5 px-20 ">
                {["Empowering every endeavor", "From launch to impact"].map((item, index) => {
                    return (
                        <p className='text-md font-regular tracking-tight leading-none' key={index}>{item}</p>
                    );
                })}
                <div className="start flex items-center gap-5">
                    <div className="flex items-center gap-2 px-5 py-2 border-[2px] border-zinc-500 rounded-full">
                        Kickstart the mission
                        <div className="flex items-center justify-center w-10 h-10 border-[2px] border-zinc-500 rounded-full">
                            <span className="rotate-[225deg]">
                                <FaArrowDown />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {isVisible && (
                <button
                    type="button"
                    onClick={scrollToSection}
                    className="scroll-arrow"
                    aria-label="Scroll down"
                >
                    <FaArrowDown />
                </button>
            )}
        </div>
    );
}

export default LandingPage;
