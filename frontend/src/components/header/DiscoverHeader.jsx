import React, { useState } from "react"
import { ReactComponent as Search } from "../../assets/icons/search-icon.svg"
import { Container, MenuItem } from "./styles/DiscoverHeader.styled"
import {
  setCountryFilter,
  setCountryIndex,
} from "../../state/discover/artistAndGalleryFilterSlice"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"

export default function DiscoverHeader() {
  const dispatch = useDispatch()

  const { type } = useParams()

  const selectTab = () => {
    dispatch(setCountryFilter(""))
    dispatch(setCountryIndex(0))
  }

  return (
    <Container>
      <MenuItem $activeTab={type === "artists"} onClick={() => selectTab()}>
        <Link to={"/discover/artists"}>Artists</Link>
      </MenuItem>
      <MenuItem $activeTab={type === "artworks"} onClick={() => selectTab()}>
        <Link to={"/discover/artworks"}>Artworks</Link>
      </MenuItem>
      <MenuItem $activeTab={type === "galleries"} onClick={() => selectTab()}>
        <Link to={"/discover/galleries"}>Galleries</Link>
      </MenuItem>
      <Search style={{ marginLeft: "1em", cursor: "pointer" }} />
    </Container>
  )
}
