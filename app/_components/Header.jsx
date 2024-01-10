'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { RiMenuFill,RiCloseLine } from 'react-icons/ri'

const Header = () => {

    const [open, setOpen] = useState(false)

    return (
        <div className='w-full h-[60px] p-4 sm:p-10 items-center flex justify-between bg-[#ecf0f3]'>
<Image src={'/logo.svg'} width={220} height={100}/>
            {/* desktop screen */}
            <ul className='hidden gap-5 md:flex'>
                <li className=' text-secondary font-medium text-[18px] cursor-pointer hover:text-secondary/80 transition-all duration-300'>Home</li>
                <li className=' text-secondary font-medium text-[18px] cursor-pointer hover:text-secondary/80 transition-all duration-300'>Upload</li>
                <li className=' text-secondary font-medium text-[18px] cursor-pointer hover:text-secondary/80 transition-all duration-300'>About Us</li>
                <li className=' text-secondary font-medium text-[18px] cursor-pointer hover:text-secondary/80 transition-all duration-300'>Contact Us</li>
            </ul>
            <div className='flex items-center gap-5'>
                <a href='/files' className='rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transitionr hover:bg-blue-700'>
                    Get Startd
                </a>

                {/* mobile screen */}
                {open ? (<RiCloseLine onClick={() => { setOpen(false) }} className=' cursor-pointer text-[30px] block md:hidden' />) : (<RiMenuFill onClick={() => { setOpen(true) }} className=' cursor-pointer text-[25px] block md:hidden' />)}
            </div>

            <div className={`absolute w-full ${open ? "top-[11%] opacity-1 pointer-events-auto" : "-top-[50%] opacity-0 pointer-events-none"} left-0 backdrop-blur-md p-[3.2rem] bg-[#ecf0f3] transition-all duration-[0.5s] block md:hidden`}>
                <ul className='flex flex-col gap-5'>
                    <li className=' text-secondary font-medium text-[20px] cursor-pointer hover:text-secondary/80 transition-all duration-300'>Home</li>
                    <li className=' text-secondary font-medium text-[20px] cursor-pointer hover:text-secondary/80 transition-all duration-300'>Upload</li>
                    <li className=' text-secondary font-medium text-[20px] cursor-pointer hover:text-secondary/80 transition-all duration-300'>About Us</li>
                    <li className=' text-secondary font-medium text-[20px] cursor-pointer hover:text-secondary/80 transition-all duration-300'>Contact Us</li>
                </ul>
            </div>
        </div>
    )
}

export default Header