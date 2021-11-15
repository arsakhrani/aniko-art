import React, { useState } from "react"
import { ReactComponent as Search } from "../../assets/icons/search-icon.svg"
import { Container, MenuItem } from "./styles/DiscoverHeader.styled"
import { change } from "../../state/discover/discoverFiltersSlice"
import {
  setCountryFilter,
  setCountryIndex,
} from "../../state/discover/artistAndGalleryFilterSlice"
import { useDispatch } from "react-redux"

export default function DiscoverHeader() {
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState(1)

  const selectTab = (number, filter) => {
    setActiveTab(number)
    dispatch(change(filter))
    dispatch(setCountryFilter(""))
    dispatch(setCountryIndex(0))
  }

  return (
    <Container>
      <MenuItem $activeTab={activeTab} onClick={() => selectTab(1, "artists")}>
        Artists
      </MenuItem>
      <MenuItem $activeTab={activeTab} onClick={() => selectTab(2, "artworks")}>
        Artworks
      </MenuItem>
      <MenuItem
        $activeTab={activeTab}
        onClick={() => selectTab(3, "galleries")}
      >
        Galleries
      </MenuItem>
      <Search style={{ marginLeft: "1em", cursor: "pointer" }} />
    </Container>
  )
}
