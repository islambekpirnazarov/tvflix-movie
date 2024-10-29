import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    popularMovies: [],
    popularMoviesLoad: false,
    popularMoviesError: null
}

export const fetchPopularMoviesData = createAsyncThunk(
    "popularMovies/fetchPopularMoviesData",
    async (url) => {
        const res = await axios.get(url)
        return res.data.results
    }
)

const popularMovieSlice = createSlice({
    name: "popularMovies",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPopularMoviesData.pending, (state) => {
            state.popularMoviesLoad = true
        }).addCase(fetchPopularMoviesData.fulfilled, (state, action) => {
            state.popularMoviesLoad = false,
                state.popularMovies = action.payload
        }).addCase(fetchPopularMoviesData.rejected, (state, action) => {
            state.popularMoviesError = action.error.message
        })
    }
})

export default popularMovieSlice.reducer