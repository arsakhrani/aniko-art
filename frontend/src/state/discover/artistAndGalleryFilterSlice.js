import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: "",
  index: 0,
}

export const artistAndGalleryFilterSlice = createSlice({
  name: "artistAndGalleryFilter",
  initialState,
  reducers: {
    setCountryFilter: (state, action) => {
      state.value = action.payload
    },
    setCountryIndex: (state, action) => {
      state.index = action.payload
    },
  },
})

export const { setCountryFilter, setCountryIndex } =
  artistAndGalleryFilterSlice.actions

export default artistAndGalleryFilterSlice.reducer
