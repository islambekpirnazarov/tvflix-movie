import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    similarMovies : [],
    similarMovieLoad : false,
    similarMovieError : null,
}

export const fetchSimilarMovies = createAsyncThunk(
    "similarMovies/fetchSimilarMovies",
    async(url) => {
        const {data} = await axios.get(url)
        return data.results
    }
)

const similarMoviesSlice = createSlice({
    name : "similarMovies",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchSimilarMovies.pending, (state) => {
            state.similarMovieLoad = true
        }).addCase(fetchSimilarMovies.fulfilled, (state, action) => {
            state.similarMovieLoad = false,
            state.similarMovies = action.payload
        }).addCase(fetchSimilarMovies.rejected, (state, action) => {
            state.similarMovieError = action.error.message
        })
    }
})

export default similarMoviesSlice.reducer