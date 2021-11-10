import React from "react"
import { PalleteContainer, Color } from "./styles/ColorFilter.styled"
import { Container } from "./styles/CountryFilter.styled"

export default function ColorFilter() {
  return (
    <Container>
      <h5>COLOR</h5>
      <PalleteContainer>
        <Color $color={"blue"} />
        <Color $color={"red"} />
        <Color $color={"yellow"} />
        <Color $color={"purple"} />
        <Color $color={"orange"} />
        <Color $color={"green"} />
        <Color $color={"#fab546"} />
        <Color $color={"#baf761"} />
        <Color $color={"#198463"} />
        <Color $color={"#172d35"} />
        <Color $color={"#901aed"} />
        <Color $color={"#87d42a"} />
      </PalleteContainer>
    </Container>
  )
}
