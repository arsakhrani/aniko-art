import { configureStore } from "@reduxjs/toolkit"
import discoverFiltersReducer from "./state/discover/discoverFiltersSlice"
import registrationInfoReducer from "./state/registration/registrationInfoSlice"
import artistAndGalleryFilterReducer from "./state/discover/artistAndGalleryFilterSlice"
import artworkFilterReducer from "./state/discover/artworkFilterSlice"
import uploadArtReducer from "./state/upload/uploadArtSlice"

export const store = configureStore({
  reducer: {
    discoverFilters: discoverFiltersReducer,
    registrationInfo: registrationInfoReducer,
    artistAndGalleryFilter: artistAndGalleryFilterReducer,
    artworkFilter: artworkFilterReducer,
    uploadDetails: uploadArtReducer,
  },
})
