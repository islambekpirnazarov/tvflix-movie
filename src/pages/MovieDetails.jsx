import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetailMovieCredits } from '../store/slices/detailMovieCreditsSlice'
import { fetchMovieVideo } from '../store/slices/movieVideoSlice'
import { fetchSimilarMovies } from '../store/slices/similarMoviesSlice'
import { fetchDetailMovie } from '../store/slices/detailMovieSlice'
import { CgSpinnerAlt } from "react-icons/cg";
import ReactPlayer from "react-player";
import MovieCard from "../components/page-comp/MovieCard";
import { favouriteMoviesFunc } from "../store/slices/favouriteMoviesSlice";
import LoadingContent from "../components/page-comp/LoadingContent";


const MovieDetails = () => {
  const { id } = useParams()
  const { favouriteMovies } = useSelector(state => state.favouriteMovie)
  const { detailMovie, detailMovieLoad } = useSelector(state => state.detailMovies)
  const { detailMovieCredits, detailMovieCreditsLoad } = useSelector(state => state.detailMovieCredit)
  const { movieVideo, movieVideoLoad } = useSelector(state => state.movieVideo)
  const { similarMovies, similarMoviesLoad } = useSelector(state => state.similarMovie)
  const dispatch = useDispatch()

  const detailMovieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=ec7d635fb241ea396c8c339ce5e776b2`
  const detailMovieCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ec7d635fb241ea396c8c339ce5e776b2`
  const movieVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ec7d635fb241ea396c8c339ce5e776b2&language=en-US`
  const similarMoviesUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=ec7d635fb241ea396c8c339ce5e776b2`
  // console.log(detailMovieCredits?.cast);
  console.log(movieVideo);
  // console.log(similarMovies);
  console.log(detailMovie);
  useEffect(() => {
    dispatch(fetchDetailMovie(detailMovieUrl))
    dispatch(fetchDetailMovieCredits(detailMovieCreditsUrl))
    dispatch(fetchMovieVideo(movieVideoUrl))
    dispatch(fetchSimilarMovies(similarMoviesUrl))
  }, [id])
  return (
    <>
      {detailMovieLoad ?
        <LoadingContent/>
        :
        <div className="relative">

          <span onClick={() => dispatch(favouriteMoviesFunc(detailMovie))} className="absolute top-[15px] left-[15px] text-[25px] bg-white p-[10px] rounded-full bg-opacity-40 cursor-pointer">
            {favouriteMovies.find(favItem => favItem.id == detailMovie?.id) ? <AiFillHeart className="text-[hsla(349,100%,43%,1)]" /> : <AiOutlineHeart/>}
          </span>

          <div className='sm:flex items-center justify-between gap-[20px]'>
            <div className='flex-1 max-w-[350px] min-w-[250px]'>
              <img src={`https://www.themoviedb.org/t/p/w500${detailMovie?.poster_path}`} alt={detailMovie?.title} className='rounded-[25px]' />
            </div>
            <div className='flex-[2.5]'>
              <h2 className='text-[25px] md:text-[35px] lg:text-[40px] font-[700]'>{detailMovie?.title}</h2>
              <div className='flex items-center gap-[10px] text-[hsla(250,2%,59%,1)] text-[18px]'>
                <div className='flex items-center gap-[3px]'>
                  <span className="text-[hsla(44,100%,49%,1)] text-[20px]"><AiFillStar /></span>
                  <span>{detailMovie?.vote_average.toFixed(1)}</span>
                </div>
                <p>{detailMovie?.runtime}min</p>
                <p>{detailMovie?.release_date.slice(0, 4)}</p>
              </div>
              <div className="text-[hsla(250,2%,59%,1)] text-[18px] flex items-center gap-[10px]">
                {detailMovie?.genres.map((item, index) => (
                  <span key={item.id}>{item.name}{index + 1 === detailMovie?.genres.length ? "" : ","}</span>
                ))}
              </div>
              <p className="text-[18px] font-[500] lg:w-[80%] my-[10px]">{detailMovie?.overview}</p>
              <p className="text-[18px] font-[500]">Budget: {detailMovie?.budget.toLocaleString()}$</p>
              <p className="text-[18px] font-[500]">Revenue: {detailMovie?.revenue.toLocaleString()}$</p>
            </div>
          </div>
          <div className="my-[15px]">
            <h4 className="text-[27px] text-[hsla(250,2%,59%,1)] font-[700]">Starring</h4>
            <div className="flex items-center gap-[15px] overflow-x-auto scroll-hidden">
              {detailMovieCredits?.cast.slice(0, 20).map(item => (
                <div key={item.id} className="flex-1 cursor-pointer">
                  <img className="min-w-[110px] min-h-[110px] max-w-[110px] max-h-[110px] rounded-full object-cover" src={`https://www.themoviedb.org/t/p/w185${item.profile_path}`} alt={item.name} />
                  <p className="line-clamp-1">{item.character}</p>
                  <p className="line-clamp-1">{item.original_name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[27px] text-[hsla(250,2%,59%,1)] font-[700]">Trailer And Clips</h4>
            <div className="flex items-center gap-[15px] overflow-x-auto">
              {movieVideo?.slice(0, 10).map(item => (
                <div key={item.id} className="w-[380px] h-[254px] py-[15px] rounded-[20px]">
                  <ReactPlayer height={'100%'} width={'380px'} url={`https://www.youtube.com/watch/${item.key}`} controls />
                </div>
              ))}
            </div>
          </div>
          <div className="my-[15px]">
            <h4 className="text-[27px] text-[hsla(250,2%,59%,1)] font-[700]">Similar Movies</h4>
            <div className="flex items-center gap-[15px] overflow-x-auto py-[15px]">
              {similarMovies?.map(item => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>}
    </>
  )
}

export default MovieDetails