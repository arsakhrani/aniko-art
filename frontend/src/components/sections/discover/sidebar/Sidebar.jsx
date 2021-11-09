import React from "react"
import CountryFilter from "./CountryFilter"
import { Container } from "./styles/Sidebar.styled"

export default function Sidebar() {
  return (
    <Container>
      <CountryFilter />
    </Container>
  )
}
