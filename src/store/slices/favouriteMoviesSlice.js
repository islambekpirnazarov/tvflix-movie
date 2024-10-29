import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    favouriteMovies: []
}

const favouriteMovieSlice = createSlice({
    name: "favouriteSlice",
    initialState,
    reducers: {
        favouriteMoviesFunc: (state, action) => {
            if (state.favouriteMovies.find(item => item.id === action.payload.id)) {
                state.favouriteMovies = state.favouriteMovies.filter(item => item.id !== action.payload.id)
            }
            else {
                state.favouriteMovies = [...state.favouriteMovies, action.payload]
            }
        }
    }
})

export const { favouriteMoviesFunc } = favouriteMovieSlice.actions
export default favouriteMovieSlice.reducer
