import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    topRatedMovies : [],
    topRatedMoviesLoad : false,
    topRatedMoviesError : null
}

export const fetchTopRatedMoviesData = createAsyncThunk(
    "topRatedMovies/fetchTopRatedMoviesData",
    async(url) => {
        const res = await axios.get(url)
        return res.data.results
    }
)

const topRatedMovieSlice = createSlice({
    name : "topRatedMovies",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchTopRatedMoviesData.pending, (state) => {
            state.topRatedMoviesLoad = true
        }).addCase(fetchTopRatedMoviesData.fulfilled, (state, action) => {
            state.topRatedMoviesLoad = false,
            state.topRatedMovies = action.payload
        } ).addCase(fetchTopRatedMoviesData.rejected, (state, action) => {
            state.topRatedMoviesError = action.error.message
        })
    }
})

export default topRatedMovieSlice.reducer