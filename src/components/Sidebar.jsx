import React from 'react'
import { buttons } from '../config/constants'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const {pathname} = useLocation()
  return (
    <div className='flex flex-col pl-[40px] pt-[100px]'>
        {buttons.map(item => (
            <Link key={item.id} to={item.path}>
                <button className={`flex items-center gap-[10px] mb-[15px] ${pathname === item.path ? "text-white" : "text-[hsla(250,2%,59%,1)]"} hover:text-white`}>
                    <span className={`${pathname === item.path ? "text-[hsla(349,69%,51%,1)]" : "text-[hsla(349,100%,43%,1)]"} text-[22px]`}>{item.icon()}</span>
                    <span className='text-[18px]'>{item.title}</span>
                </button>
            </Link>
        ))}
    </div>
  )
}

export default Sidebar