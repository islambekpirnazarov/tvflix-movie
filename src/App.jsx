import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Favourite from './pages/Favourite'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/favourite' element={<Favourite/>}/>
      <Route path='movie-details/:id' element={<MovieDetails/>}/>
    </Route>
  ))
  return (
    <RouterProvider router={router}/>
  )
}

export default App