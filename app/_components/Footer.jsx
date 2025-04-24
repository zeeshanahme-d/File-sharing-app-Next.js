import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full absolute bottom-2 mt-2 flex-col flex items-center gap-3'>
            <div className='text-sm lg:text-base'>
                @2024 Created by Zeeshan Ahmed
            </div>
            <div className='flex gap-2'>
                <Link href='https://github.com/zeeshanahme-d'>
                    <Github className='text-base cursor-pointer' />
                </Link>
                <Link href='https://linkedin.com/in/zeeshanahme-d'>
                    <Linkedin className='text-base cursor-pointer' />
                </Link>
            </div>
        </div>
    )
}

export default Footer;