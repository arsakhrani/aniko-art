import { configureStore } from "@reduxjs/toolkit"
import registrationInfoReducer from "./state/registration/registrationInfoSlice"
import discoverFilterReducer from "./state/discover/discoverFilterSlice"
import collectionCountReducer from "./state/discover/collectionCountSlice"
import uploadArtReducer from "./state/upload/uploadArtSlice"

export const store = configureStore({
  reducer: {
    registrationInfo: registrationInfoReducer,
    discoverFilter: discoverFilterReducer,
    collectionCount: collectionCountReducer,
    uploadDetails: uploadArtReducer,
  },
})
