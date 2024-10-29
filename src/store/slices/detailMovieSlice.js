import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    detailMovie : null,
    detailMovieLoad : false,
    detailMovieError : null
}

export const fetchDetailMovie = createAsyncThunk(
    "detailMovie/fetchDetailMovie",
    async(url) => {
        const res = await axios.get(url)
        return res.data
    }
)

const detailMovieSlice = createSlice({
    name : "detailMovie",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchDetailMovie.pending, (state) => {
            state.detailMovieLoad = true
        }).addCase(fetchDetailMovie.fulfilled, (state, action) => {
            state.detailMovieLoad = false,
            state.detailMovie = action.payload
        }).addCase(fetchDetailMovie.rejected, (state, action) => {
            state.detailMovieError = action.error.message
        })
    }
})



export default detailMovieSlice.reducer