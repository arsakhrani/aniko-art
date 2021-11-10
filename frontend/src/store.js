import { configureStore } from "@reduxjs/toolkit"
import discoverFiltersReducer from "./state/discover/discoverFiltersSlice"
import registrationInfoReducer from "./state/registration/registrationInfoSlice"

export const store = configureStore({
  reducer: {
    discoverFilters: discoverFiltersReducer,
    registrationInfo: registrationInfoReducer,
  },
})
