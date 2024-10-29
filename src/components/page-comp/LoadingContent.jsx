import React from 'react'
import { CgSpinnerAlt } from 'react-icons/cg'

const LoadingContent = () => {
    return (
        <div className='w-full h-[70vh] flex justify-center items-center text-[hsla(349,100%,43%,1)]'>
            <span className="text-[70px]"><CgSpinnerAlt className="animate-spin"/></span>
            <span className="text-[30px] font-[600]">Loading</span>
        </div>
    )
}

export default LoadingContent