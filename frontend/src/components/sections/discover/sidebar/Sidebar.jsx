import React from "react"
import CountryFilter from "./CountryFilter"
import OtherFilters from "./OtherFilters"
import { Container } from "./styles/Sidebar.styled"
import { useSelector } from "react-redux"

export default function Sidebar() {
  const filterType = useSelector((state) => state.discoverFilters.value)

  return (
    <Container>
      {(filterType === "artists" || filterType === "galleries") && (
        <CountryFilter />
      )}
      {filterType === "artworks" && <OtherFilters />}
    </Container>
  )
}
