import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    trendingMovies: [],
    trendingMoviesLoad: false,
    trendingMoviesError: null
}

export const fetchTrendingMoviesData = createAsyncThunk(
    "trendingMovies/fetchTrendingMoviesData",
    async (url) => {
        const res = await axios.get(url)
        return res.data.results
    }
)

const trendingMovieSlice = createSlice({
    name: "trendingMovies",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTrendingMoviesData.pending, (state) => {
            state.trendingMoviesLoad = true
        }).addCase(fetchTrendingMoviesData.fulfilled, (state, action) => {
            state.trendingMoviesLoad = false,
                state.trendingMovies = action.payload
        }).addCase(fetchTrendingMoviesData.rejected, (state, action) => {
            state.trendingMoviesError = action.error.message
        })
    }
})

export default trendingMovieSlice.reducer