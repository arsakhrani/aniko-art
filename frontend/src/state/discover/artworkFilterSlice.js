import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  minPrice: 0,
  maxPrice: 100000000,
  medium: "",
  size: "",
  color: "",
}

export const artworkFilterSlice = createSlice({
  name: "artworkFilter",
  initialState,
  reducers: {
    changeMinPrice: (state, action) => {
      state.minPrice = action.payload
    },
    changeMaxPrice: (state, action) => {
      state.maxPrice = action.payload
    },
    changeMedium: (state, action) => {
      state.medium = action.payload
    },
    changeSize: (state, action) => {
      state.size = action.payload
    },
    changeColor: (state, action) => {
      state.color = action.payload
    },
  },
})

export const {
  changeMinPrice,
  changeMaxPrice,
  changeMedium,
  changeSize,
  changeColor,
} = artworkFilterSlice.actions

export default artworkFilterSlice.reducer
