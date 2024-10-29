import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    searchMovies : [],
    searchMoviesLoad : false,
    searchMoviesError : null
}

export const fetchSearchMovies = createAsyncThunk(
    "searchMovies/fetchSearchMovies",
    async(url) => {
        const res = await axios.get(url)
        return res.data.results
    }
)

const searchMoviesSlice = createSlice({
    name : "searchMovies",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchSearchMovies.pending, (state) => {
            state.searchMoviesLoad = true
       }).addCase(fetchSearchMovies.fulfilled, (state, action) => {
            state.searchMoviesLoad = false,
            state.searchMovies = action.payload
       }).addCase(fetchSearchMovies.rejected, (state, action) => {
            state.searchMoviesError = action.error.message
       })
    }
})

export default searchMoviesSlice.reducer