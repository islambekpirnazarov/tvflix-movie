import { configureStore } from "@reduxjs/toolkit";
import topRatedMovieSlice from "./slices/topRatedMovieSlice";
import popularMovieSlice from "./slices/popularMovieSlice";
import upcomingMovieSlice from "./slices/upcomingMovieSlice";
import trendingMovieSlice from "./slices/trendingMovieSlice";
import favouriteMoviesSlice from "./slices/favouriteMoviesSlice";
import searchMoviesSlice from "./slices/searchMoviesSlice";
import genresListSlices from "./slices/genresListSlices";
import genresMoviesSlice from "./slices/genresMoviesSlice";

import movieVideoSlice from "./slices/movieVideoSlice";
import similarMoviesSlice from "./slices/similarMoviesSlice";
import detailMovieCreditsSlice from "./slices/detailMovieCreditsSlice";
import detailMovieSlice from "./slices/detailMovieSlice";


export const store = configureStore({
    reducer: {
        topRatedMovie: topRatedMovieSlice,
        popularMovie: popularMovieSlice,
        upcomingMovie: upcomingMovieSlice,
        trendingMovie: trendingMovieSlice,
        favouriteMovie: favouriteMoviesSlice,
        searchMovie: searchMoviesSlice,
        genreList: genresListSlices,
        genreMovie: genresMoviesSlice,
        detailMovies : detailMovieSlice,
        detailMovieCredit: detailMovieCreditsSlice,
        movieVideo: movieVideoSlice,
        similarMovie: similarMoviesSlice
    }
})