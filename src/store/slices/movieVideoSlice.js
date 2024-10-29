import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    movieVideo : [],
    movieVideoLoad : false,
    movieVideoError : null
}

export const fetchMovieVideo = createAsyncThunk(
    "movieVideo/fetchMovieVideo",
    async(url) => {
        const {data} = await axios.get(url)
        return data.results
    }
)

const movieVideoSlice = createSlice({
    name : "movieVideo",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchMovieVideo.pending, (state) => {
            state.movieVideoLoad = true
        }).addCase(fetchMovieVideo.fulfilled, (state, action) => {
            state.movieVideoLoad = false,
            state.movieVideo = action.payload
        }).addCase(fetchMovieVideo.rejected, (state, action) => {
            state.movieVideoError = action.error.message
        })
    }
})

export default movieVideoSlice.reducer