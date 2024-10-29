import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    genresMovies: [],
    genresMoviesLoad: false,
    genresMoviesError: null,
    page: 1,
}

export const fetchGenresMovies = createAsyncThunk(
    "genresMovies/fetchGenresMovies",
    async (url) => {
        const res = await axios.get(url)
        return res.data.results
    }
)

const genresMovieSlice = createSlice({
    name: "genresMovies",
    initialState,
    redusers: {
        incrementPage : (state) =>  {
            state.page = state.page + 1
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenresMovies.pending, (state) => {
            state.genresMoviesLoad = true
        }).addCase(fetchGenresMovies.fulfilled, (state, action) => {
            state.genresMoviesLoad = false,
                state.genresMovies = action.payload
        }).addCase(fetchGenresMovies.rejected, (state, action) => {
            state.genresMoviesError = action.error.message
        })
    }
})
export const { incrementPage } = genresMovieSlice.actions
export default genresMovieSlice.reducer