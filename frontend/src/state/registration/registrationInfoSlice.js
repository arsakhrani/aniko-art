import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: {},
}

export const registrationInfoSlice = createSlice({
  name: "registraionInfo",
  initialState,
  reducers: {
    saveInfo: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { saveInfo } = registrationInfoSlice.actions

export default registrationInfoSlice.reducer
