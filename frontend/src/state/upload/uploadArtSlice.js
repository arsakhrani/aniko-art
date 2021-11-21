import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: null,
}

export const uploadArtSlice = createSlice({
  name: "uploadDetails",
  initialState,
  reducers: {
    saveDetails: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { saveDetails } = uploadArtSlice.actions

export default uploadArtSlice.reducer
