import React from "react"
import { Container } from "./styles/CountryFilter.styled"

export default function SizeFilter() {
  return (
    <Container>
      <h5>SIZE</h5>
      <ul>
        <li>Small</li>
        <li>Medium</li>
        <li>Large</li>
      </ul>
    </Container>
  )
}
