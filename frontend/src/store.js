import { configureStore } from "@reduxjs/toolkit"
import discoverFiltersReducer from "./state/discover/discoverFiltersSlice"

export const store = configureStore({
  reducer: {
    discoverFilters: discoverFiltersReducer,
  },
})
