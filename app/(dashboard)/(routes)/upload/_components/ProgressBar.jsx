import React from 'react'

const ProgressBar = ({ progress}) => {
    return (
        <div className='bg-gray-400 w-full h-5 mt-5 rounded-full'>
            <div className=' bg-primary h-5 rounded-full py-0.2 text-sm text-gray-900'
                style={{ width: `${progress}%` }}>
                {`${Number(progress).toFixed(0)}%`}
            </div>

        </div>
    )
}

export default ProgressBar;