import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai";
import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from '../components/page-comp/MovieCard'

const Favourite = () => {
  const { favouriteMovies } = useSelector(state => state.favouriteMovie)
  return (
    <>
      {favouriteMovies.length > 0 ?
        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[15px]'>
          {favouriteMovies.map(item => (
            <MovieCard item={item} key={item.id} />
          ))}
        </div>
        :
        <div className="flex items-center justify-center flex-col w-full h-[70vh]">
          <div className="text-[150px] text-red-500">
            <AiFillHeart />
          </div>
          <div className="text-center">
            It looks like your favorites list is empty. To add movies to your favorites, simply browse our collection and click the heart icon for movies you love. Start building your favorites list now!
          </div>
        </div>}
    </>
  )
}

export default Favourite