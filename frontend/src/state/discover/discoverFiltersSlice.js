import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: "artists",
}

export const discoverFiltersSlice = createSlice({
  name: "discoverFilters",
  initialState,
  reducers: {
    change: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { change } = discoverFiltersSlice.actions

export default discoverFiltersSlice.reducer
