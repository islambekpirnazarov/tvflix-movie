import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { buttons } from '../config/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopRatedMoviesData } from '../store/slices/topRatedMovieSlice'
import { fetchPopularMoviesData } from '../store/slices/popularMovieSlice'
import { fetchUpcomingMoviesData } from '../store/slices/upcomingMovieSlice'
import { fetchTrendingMoviesData } from '../store/slices/trendingMovieSlice'
import { fetchSearchMovies } from '../store/slices/searchMoviesSlice'
import { fetchGenreList } from '../store/slices/genresListSlices'
import { fetchGenresMovies } from '../store/slices/genresMoviesSlice'

const MainLayout = () => {
    const base_url = "https://api.themoviedb.org/3"
    const api_key = "ec7d635fb241ea396c8c339ce5e776b2"
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const {topRatedMovies} = useSelector(state => state.topRatedMovie)
    const {popularMovies} = useSelector(state => state.popularMovie)
    const {upcomingMovies} = useSelector(state => state.upcomingMovie)
    const topRatedMovieUrl = `${base_url}/movie/top_rated?api_key=${api_key}`
    const popularMoviesUrl = `${base_url}/movie/popular?api_key=${api_key}`
    const upcomingMoviesUrl = `${base_url}/movie/upcoming?api_key=${api_key}`
    const trendingMoviesUrl = `${base_url}/trending/movie/week?api_key=${api_key}`
    const genreListUrl = `${base_url}/genre/movie/list?api_key=${api_key}`
    const genresMoviesUrl = `${base_url}/discover/movie?api_key=${api_key}&with_genres=28`
    
    useEffect(() => {
        dispatch(fetchTopRatedMoviesData(topRatedMovieUrl))
        dispatch(fetchPopularMoviesData(popularMoviesUrl))
        dispatch(fetchUpcomingMoviesData(upcomingMoviesUrl))
        dispatch(fetchTrendingMoviesData(trendingMoviesUrl))
        dispatch(fetchGenreList(genreListUrl))
        dispatch(fetchGenresMovies(genresMoviesUrl))
    }, [])
    useEffect(() => {
        dispatch(fetchSearchMovies(`${base_url}/search/movie?api_key=${api_key}&query=Avengers`))
    }, [])
    // console.log(topRatedMovies);
    // console.log(popularMovies);
    // console.log(upcomingMovies);
    return (
        <div className='font-DMSans bg-[hsl(220,17%,7%,1)] text-white min-h-[100vh]'>
            <div className='w-[92%] mx-auto max-w-[1440px]'>
                <div className='h-[100px] flex items-center justify-between'>
                    <Header />
                </div>
            </div>
            <div className='flex'>
                <div className='min-w-[250px] hidden md:block'>
                    <Sidebar />
                </div>
                <div className='md:hidden z-10 fixed left-0 right-0 bottom-0 h-[70px] bg-[hsl(220,17%,7%,1)] flex items-center justify-between gap-[5px] p-[10px]'>
                    {buttons.map(item => (
                        <Link key={item.id} to={item.path}>
                            <button className={`${pathname === item.path ? "bg-[#ff0000]" : ""} text-[hsla(250,2%,59%,1)] hover:text-white p-[5px] flex flex-col justify-center items-center text-nowrap w-[65px] rounded-md`}>
                                <span className={`${pathname === item.path ? "text-white" : "text-[hsla(349,100%,43%,1)]"} text-[25px] flex justify-center`}>{item.icon()}</span>
                                <span className='text-[12px]'>{item.title}</span>
                            </button>
                        </Link>
                    ))}
                </div>
                <div className='bg-[hsla(250,13%,11%,1)] w-full min-h-[calc(100vh-100px)] max-h-[calc(100vh-100px)] overflow-y-auto rounded-tl-[30px] py-[20px] px-[10px] md:px-[30px]'>
                    <Content>
                        <Outlet />
                    </Content>
                </div>
            </div>
        </div>
    )
}

export default MainLayout