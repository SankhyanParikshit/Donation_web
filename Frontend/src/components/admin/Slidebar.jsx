import React, { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboardCustomize, MdCampaign } from "react-icons/md";
import { FaUser, FaDollarSign, FaChartArea } from "react-icons/fa";
import { TbPresentationAnalytics } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Slidebar = () => {
    const menus = [
        { name: "Dashboard", Link: '', icon: MdOutlineDashboardCustomize },
        { name: "Users", Link: '/admin/user', icon: FaUser, margin: true },
        { name: "Campaigns", Link: '/admin/campaigns', icon: MdCampaign },
        { name: "Revenue", Link: '/admin/revenue', icon: FaDollarSign },
        { name: "Charts", Link: '/admin/charts', icon: FaChartArea, margin: true },
        { name: "Analytics", Link: '/admin/analytics', icon: TbPresentationAnalytics },
    ];

    const [open, setOpen] = useState(true);

    return (
        <section className='flex h-screen gap-6'>
            <div className={`mx-2 my-2.5 bg-black rounded-3xl ${open ? 'w-60' : 'w-14'} duration-500 min-h-96 shadow-lg shadow-gray-300 text-gray-100 py-5 flex flex-col`}>
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3 size={26} className='cursor-pointer mr-3.5' onClick={() => setOpen(!open)} />
                </div>
                <div className='mt-4 flex flex-col gap-4 flex-1'>
                    {
                        menus.map((menu, i) => (
                            <Link to={menu.Link} key={i} className={`${menu.margin && 'mt-5'} group mx-2.5 flex items-center text-sm gap-3.5 font-large p-2 hover:bg-gray-800 rounded-md`}>
                                <div>
                                    {React.createElement(menu.icon, { size: '20' })}
                                </div>
                                <h1 style={{ transitionDelay: `${i + 3}00ms` }} className={`duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'} group-hover:opacity-100`}>{menu.name}</h1>
                                <h1 className={`${open && 'hidden'} absolute left-32 bg-white font-semibold text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>{menu.name}</h1>
                            </Link>
                        ))
                    }
                </div>
                <div className="mt-auto">
                    <Link to="/" className="group mx-2.5 flex items-center text-sm gap-3.5 font-large p-2 hover:bg-gray-800 rounded-md">
                        {React.createElement(IoLogOut, { size: '20' })}
                        <span className={`${!open && 'hidden'} duration-500 group-hover:opacity-100`}>Logout</span>
                        <h1 className={`${open && 'hidden'} absolute left-32 bg-white font-semibold text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>Logout</h1>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Slidebar;
