import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  minPrice: 0,
  maxPrice: 100000000,
  medium: "",
  size: "",
  color: "",
  searchParams: "",
  country: "",
}

export const discoverFilterSlice = createSlice({
  name: "discoverFilter",
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
    changeCountry: (state, action) => {
      state.country = action.payload
    },
    changeSearchParams: (state, action) => {
      state.searchParams = action.payload
    },
  },
})

export const {
  changeMinPrice,
  changeMaxPrice,
  changeMedium,
  changeSize,
  changeColor,
  changeCountry,
  changeSearchParams,
} = discoverFilterSlice.actions

export default discoverFilterSlice.reducer
