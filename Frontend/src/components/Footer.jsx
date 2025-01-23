import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
    return (
        <div className='w-full h-screen bg-zinc-600 p-20 flex'>
            <div className="w-1/2 h-full flex flex-col justify-between">
                <div className="hoding font-landing">
                    <h1 className='text-[6vw] font-semibold uppercase leading-none '>EYE -</h1>
                    <h1 className='text-[6vw] font-semibold uppercase leading-none '>OPENING</h1>
                </div>

                <h2 className='text-[2vw] leading-none -mt-48 mr-8'>
                    Discover the impact of your contributions and see how your support transforms lives. Open your eyes to the difference you can make today.
                </h2>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" width="100" height="20">
                    <text x="0" y="15" fontFamily="Arial, Helvetica, sans-serif" fontSize="21" fontWeight="800" fontStyle="italic">HEALS.</text>
                </svg>
            </div>

            <div className="w-1/2 h-full flex flex-col justify-center items-center ">
                <div className="flex flex-col items-start h-full">
                    <h2 className='text-[2vw] font-semibold uppercase mb-4'>Contact Us</h2>
                    <p className='text-[1.5vw]'>123 Healing St.<br />Wellness City, HC 45678</p>
                    <p className='text-[1.5vw]'>Email: info@heals.org</p>
                    <p className='text-[1.5vw]'>Phone: (123) 456-7890</p>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className='text-[2vw] font-semibold uppercase mb-5'>Follow Us</h2>
                    <div className="flex space-x-4 ml-2 mb-5">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-[2vw]">
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-[2vw]">
                            <i className="fab fa-twitter-square"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-[2vw]">
                            <i className="fab fa-instagram-square"></i>
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-[2vw]">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
