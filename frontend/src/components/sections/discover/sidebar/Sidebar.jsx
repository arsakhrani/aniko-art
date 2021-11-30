import React from "react"
import CountryFilter from "./CountryFilter"
import OtherFilters from "./OtherFilters"
import { Container } from "./styles/Sidebar.styled"
import { useParams } from "react-router"

export default function Sidebar() {
  const { type } = useParams()

  return (
    <Container>
      {(type === "artists" || type === "galleries") && <CountryFilter />}
      {type === "artworks" && <OtherFilters />}
    </Container>
  )
}
