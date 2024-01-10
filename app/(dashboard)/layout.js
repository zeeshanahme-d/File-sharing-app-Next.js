"use client"

import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import TopHeader from './_components/TopHeader';
import StateHandler from './context/stateHandler';

const layout = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <StateHandler.Provider value={{ open, setOpen }}>
                <div className={`${open ? 'flex backdrop-blur-md bg-gray-50' : 'hidden'} h-full lg:w-64 lg:flex flex-col fixed inset-y-0 z-50`}>
                    <SideNav />
                </div>
                <div className='lg:ml-64'>
                    <TopHeader />
                    {children}
                </div>

        </StateHandler.Provider>
    )
};

export default layout;