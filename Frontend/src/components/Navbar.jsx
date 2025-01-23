import React from 'react'

function Navbar() {
    return (
        <div className='w-full px-20 py-8 flex justify-between items-center'>
            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" width="100" height="20">
                    <text x="0" y="15" fontFamily="Arial, Helvetica, sans-serif" fontSize="21" fontWeight="800" fontStyle="italic">HEALS.</text>
                </svg>
            </div>
            <div className="links flex gap-10 font-navbar">
                {["About Us" , "Campaign" ,"Our Work","Contact "].map((item,index)=>(
                    <a key={index} className={`text-lg captalize font-regular ${index ===4 &&'ml-32'}`}>{item}</a>
                ))}
            </div>


        </div>
    )
}

export default Navbar
