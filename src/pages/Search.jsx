import { AiOutlineSearch } from "react-icons/ai"; 
import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from '../components/page-comp/MovieCard';
import { CgSpinnerAlt } from 'react-icons/cg';
import LoadingContent from "../components/page-comp/LoadingContent";

const Search = () => {
  const { searchMovies, searchMoviesLoad } = useSelector(state => state.searchMovie)
  console.log(searchMovies);
  return (
    <>
      {searchMoviesLoad ?
        <LoadingContent/>
        :
        searchMovies.length > 0 ? <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[15px]'>
          {searchMovies.map(item => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div> :
          <div className='w-full h-[70vh] flex items-center justify-center flex-col text-[30px] font-[700]'>
            <span className="text-[200px]"><AiOutlineSearch /></span>
            <span>Result for no</span>
          </div>}
    </>
  )
}

export default Search