import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  artists: 0,
  artworks: 0,
  galleries: 0,
}

export const collectionCountSlice = createSlice({
  name: "collectionCount",
  initialState,
  reducers: {
    changeArtistsCount: (state, action) => {
      state.artists = action.payload
    },
    changeArtworksCount: (state, action) => {
      state.artworks = action.payload
    },
    changeGalleriesCount: (state, action) => {
      state.galleries = action.payload
    },
  },
})

export const { changeArtistsCount, changeArtworksCount, changeGalleriesCount } =
  collectionCountSlice.actions

export default collectionCountSlice.reducer
