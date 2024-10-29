import { CiSearch } from "react-icons/ci";
import React from 'react'
import logo from "../img/logo.svg"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSearchMovies } from "../store/slices/searchMoviesSlice";
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const inputValue = e.target['search-input'].value.trim()
        if (inputValue.length > 0) {
            navigate(`/search`)
            dispatch(fetchSearchMovies(`https://api.themoviedb.org/3/search/movie?api_key=ec7d635fb241ea396c8c339ce5e776b2&query=${inputValue}`))
        } else {
            e.target['search-input'].focus()
        }
    }
    return (
        <div className='h-[70px] w-full flex items-center justify-between'>
            <Link to={'/'}>
                <img className='w-[120px] md:w-[160px]' src={logo} alt="logo" />
            </Link>
            <div className='relative'>
                <span className='absolute top-[50%] translate-y-[-50%] left-[10px] text-[22px] text-[#ddd]'>
                    <CiSearch />
                </span>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input id="search-input" type="text" placeholder='Search any movies...' className='w-[200px] md:w-[350px] text-[18px] px-[40px] py-[12px] rounded-md outline-none bg-[hsla(250,6%,20%,1)] border-[2px] border-[hsla(250,6%,20%,1)] focus:border-white' />
                </form>
            </div>
        </div>
    )
}

export default Header