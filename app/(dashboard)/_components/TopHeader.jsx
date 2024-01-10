"use client"

import { UserButton } from '@clerk/nextjs';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import StateHandler from '../context/stateHandler';
import { useContext } from 'react';

const TopHeader = () => {
    const { open, setOpen } = useContext(StateHandler);

    return (
        <div className='flex p-5 lg:p-6  border-b items-center justify-between lg:justify-end'>
            <AlignJustify className='lg:hidden cursor-pointer' onClick={() =>setOpen(true)}/>
            <Image src={'/logo.svg'} width={200} height={100} className='lg:hidden' alt='' />
            <UserButton />
        </div>
    )
}

export default TopHeader;