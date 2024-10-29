import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    detailMovieCredits : null,
    detailMovieCreditsLoad : false,
    detailMovieCreditsError : null
}

export const fetchDetailMovieCredits = createAsyncThunk(
    "detailMovieCredits/fetchDetailMovieCredits",
    async(url) => {
        const res = await axios.get(url)
        return res.data
    }
)

const detailMovieCreditsSlice = createSlice({
    name : "detailMovieCredits",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchDetailMovieCredits.pending, (state) => {
            state.detailMovieCreditsLoad = true
        }).addCase(fetchDetailMovieCredits.fulfilled, (state, action) => {
            state.detailMovieCreditsLoad = false,
            state.detailMovieCredits = action.payload
        }).addCase(fetchDetailMovieCredits.rejected, (state, action) => {
            state.detailMovieCreditsError = action.error.message
        })
    }
})

export default detailMovieCreditsSlice.reducer