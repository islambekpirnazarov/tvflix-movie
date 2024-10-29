import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/page-comp/MovieCard'
import { fetchGenresMovies, incrementPage } from '../store/slices/genresMoviesSlice'
import { CgSpinnerAlt } from 'react-icons/cg'
import LoadingContent from '../components/page-comp/LoadingContent'

const Categories = () => {
  const dispatch = useDispatch()
  const { genreList, genreListLoad } = useSelector(state => state.genreList)
  const { genresMovies, page } = useSelector(state => state.genreMovie)
  // const [id, setId] = useState()
  // useEffect(() => {
  //   dispatch(fetchGenresMovies(`https://api.themoviedb.org/3/discover/movie?api_key=ec7d635fb241ea396c8c339ce5e776b2&with_genres=${id}&page=1`))
  // }, [id])

  function filterGenres(id) {
    dispatch(fetchGenresMovies(`https://api.themoviedb.org/3/discover/movie?api_key=ec7d635fb241ea396c8c339ce5e776b2&with_genres=${id}&page=1`))
  }
  return (
    <div>
      {genreListLoad ?
        <LoadingContent/>
        :
        <div>
          <div className='flex items-center overflow-x-auto text-nowrap scroll-hidden gap-[10px] lg:grid lg:grid-cols-7 lg:gap-[5px]'>
            {genreList.map(item => (
              <span key={item.id} onClick={() => filterGenres(item.id)} className='font-[500] text-[18px] cursor-pointer hover:text-[hsla(349,100%,43%,1)]'>{item.name}</span>
            ))}
          </div>
          <div className='my-[15px] grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[15px]'>
            {genresMovies.map(item => (
              <MovieCard item={item} key={item.id} />
            ))}
          </div>
          <div className='flex items-center justify-center mb-[50px]'>
            <button onClick={() => dispatch(incrementPage())} className='text-[18px] font-[700] px-[20px] py-[8px] rounded-md bg-[hsla(349,100%,43%,1)] active:scale-95'>Load More</button>
          </div>
        </div>}
    </div>
  )
}

export default Categories