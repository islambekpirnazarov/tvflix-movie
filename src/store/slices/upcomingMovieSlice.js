import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    upcomingMovies: [],
    upcomingMoviesLoad: false,
    upcomingMoviesError: null
}

export const fetchUpcomingMoviesData = createAsyncThunk(
    "upcomingMovies/fetchUpcomingMoviesData",
    async (url) => {
        const res = await axios.get(url)
        return res.data.results
    }
)

const upcomingMovieSlice = createSlice({
    name: "upcomingMovies",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUpcomingMoviesData.pending, (state) => {
            state.upcomingMoviesLoad = true
        }).addCase(fetchUpcomingMoviesData.fulfilled, (state, action) => {
            state.upcomingMoviesLoad = false,
                state.upcomingMovies = action.payload
        }).addCase(fetchUpcomingMoviesData.rejected, (state, action) => {
            state.upcomingMoviesError = action.error.message
        })
    }
})

export default upcomingMovieSlice.reducer