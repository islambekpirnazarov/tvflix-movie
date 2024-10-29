import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    genreList : [],
    genreListLoad : false,
    genreListError : null
}
export const fetchGenreList = createAsyncThunk(
    "genreList/fetchGenreList",
    async(url) => {
        const res = await axios.get(url)
        return res.data.genres
    }
)
const genreListSlices = createSlice({
    name : "genreListSlice",
    initialState,
    extraReducers : (builder) =>  {
        builder.addCase(fetchGenreList.pending, (state) => {
            state.genreListLoad = true
        }).addCase(fetchGenreList.fulfilled, (state, action) => {
            state.genreListLoad = false,
            state.genreList = action.payload
        }).addCase(fetchGenreList.rejected, (state, action) => {
            state.genreListError = action.error.message
        })
    }
})

export default genreListSlices.reducer