import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { favouriteMoviesFunc } from "../../store/slices/favouriteMoviesSlice";
import posterIcon from "../../img/poster-bg-icon.png"

const MovieCard = ({ item }) => {
    const {favouriteMovies} = useSelector(state => state.favouriteMovie)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className='cursor-pointer min-w-[200px] max-w-[200px] relative'>
            {item.poster_path ? <img onClick={() => navigate(`/movie-details/${item.id}`)} className='rounded-[20px] h-[300px]' src={`https://www.themoviedb.org/t/p/w500${item.poster_path}` || `https://www.themoviedb.org/t/p/w500${item.backdrop_path}`} alt={item.title}/> : <div className="bg-gray-300 rounded-[20px] min-w-[200px] h-[300px] flex items-center justify-center"><img src={posterIcon} className="w-[100px]" alt="" /></div>}
            <span onClick={() => dispatch(favouriteMoviesFunc(item))} className="absolute top-[10px] right-[10px] text-[25px] bg-gray-200 p-[7px] rounded-full bg-opacity-50">
                {favouriteMovies.find(favItem => favItem.id == item.id) ? <AiFillHeart className="text-[hsla(349,100%,43%,1)]"/> : <AiOutlineHeart />}
            </span>
            <h3 onClick={() => navigate(`/movie-details/${item.id}`)} className='line-clamp-1 text-[18px] font-[600]'>{item.title}</h3>
            <div className='flex items-center justify-between'>
                <div className='flex items-center text-[20px]'>
                    <span className="text-[hsla(44,100%,49%,1)]">
                        <AiFillStar />
                    </span>
                    <span>{(item.vote_average).toFixed(1)}</span>
                </div>
                <div className="px-[8px] py-[3px] bg-[hsla(0,0%,100%,0.2)] text-[18px] font-[700] rounded-md">
                    {(item.release_date).slice(0, 4)}
                </div>
            </div>
        </div>

    )
}

export default MovieCard