import { BiPlayCircle } from "react-icons/bi"; 
import { CgSpinnerAlt } from "react-icons/cg";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MovieCard from '../components/page-comp/MovieCard'
import { useNavigate } from "react-router-dom";
import LoadingContent from "../components/page-comp/LoadingContent";

const Home = () => {
  const { topRatedMovies, topRatedMoviesLoad } = useSelector(state => state.topRatedMovie)
  const { popularMovies, popularMoviesLoad } = useSelector(state => state.popularMovie)
  const { upcomingMovies, upcomingMoviesLoad } = useSelector(state => state.upcomingMovie)
  const { trendingMovies, trendingMoviesLoad } = useSelector(state => state.trendingMovie)
  const {genreList} = useSelector(state => state.genreList)
  const [activeContent, setActiveContent] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    setActiveContent(trendingMovies?.[Math.floor(Math.random() * trendingMovies.length)])
  }, [trendingMovies])
  const activeContentGenre =  genreList.filter(item => activeContent?.genre_ids.includes(item.id))
  return (
    <div>
      {topRatedMoviesLoad && popularMoviesLoad && upcomingMoviesLoad && trendingMoviesLoad ?
        <LoadingContent/>
        :
        <div>
          <div className="w-full relative mb-[15px] h-[70vh]">
            <div className="absolute top-0 left-0 rounded-[20px] overflow-hidden w-full h-[70vh] duration-200 opacity-30">
              <img src={`https://www.themoviedb.org/t/p/w1280/${activeContent?.backdrop_path}`} alt={activeContent?.name} className="object-cover h-[70vh] w-full rounded-[20px]" />
              <div className="absolute w-full h-full bg-gradient-to-t from-transparent to-gray-700 bottom-0 bg-opacity-10"></div>
            </div>
            <div className="absolute top-[20%] md:top-[50%] md:translate-y-[-50%] left-[40px] text-[hsla(250,2%,59%,1)]">
              <h2 className="font-[700] text-[30px] sm:text-[35px] md:text-[45px] text-white line-clamp-2 leading-10">{activeContent?.title}</h2>
              <div className="flex items-center gap-[30px]">
                <span className="text-[18px]">{activeContent?.release_date.slice(0, 4)}</span>
                <div className="my-[10px] px-[7px] py-[2px] rounded-[5px] bg-[hsla(0,0%,100%,0.2)] text-white font-[600]">{activeContent?.vote_average.toFixed(1)}</div>
              </div>
              <div>
                {activeContentGenre.map(item => (
                  <span key={item.id} className="text-[18px] mr-2">{item.name}</span>
                ))}
              </div>
              <div className="md:w-[60%] text-[18px] line-clamp-2">{activeContent?.overview}</div>
              <div>
                <button onClick={() => navigate(`/movie-details/${activeContent?.id}`)} className="mt-[10px] py-[10px] px-[20px] bg-[hsla(349,100%,43%,1)] rounded-md font-bold text-white flex items-center gap-[5px]">
                  <span className="text-[25px]"><BiPlayCircle /></span>
                  <span>Watch Now</span>
                </button>
              </div>
            </div>

            <div className="absolute right-[0] left-[10px] md:left-[60%] bottom-0  flex overflow-x-auto gap-[10px] mr-[10px] scroll-hidden">
              <div className="flex gap-[10px]">
                {trendingMovies.map(item => (
                  <div key={item.id} onClick={() => setActiveContent(item)} className="w-[100px] cursor-pointer duration-200">
                    <img src={`https://www.themoviedb.org/t/p/w500/${item.poster_path}`} alt={item.title} className="w-[100px] h-[140px] rounded-md object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h3 className='text-[24px] font-[600] text-[hsla(250,2%,59%,1)]'>Top Rated Movies</h3>
          <div className='flex gap-[20px] overflow-x-auto py-[15px] scroll-hidden'>
            {topRatedMovies.map(item => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>

          <h3 className='text-[24px] font-[600] text-[hsla(250,2%,59%,1)]'>Popular movies</h3>
          <div className='flex gap-[20px] overflow-x-auto py-[15px] scroll-hidden'>
            {popularMovies.map(item => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>

          <h3 className='text-[24px] font-[600] text-[hsla(250,2%,59%,1)]'>Upcoming Movies</h3>
          <div className='mb-[40px] flex gap-[20px] overflow-x-auto py-[15px] scroll-hidden'>
            {upcomingMovies.map(item => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        </div>}
    </div>
  )
}

export default Home