import React, { useState } from "react"
import {
  Container,
  StyledLink,
  LineBlocker,
} from "./styles/DefaultSideMenuLinks.styled"

export default function BuyerSideMenuLinks() {
  const [number, setNumber] = useState(0)

  return (
    <Container>
      <StyledLink
        to={"/discover/artwork"}
        onMouseEnter={() => setNumber(1)}
        onMouseLeave={() => setNumber(0)}
      >
        Discover
      </StyledLink>
      <LineBlocker $number={number} />
      <StyledLink
        to={"/manage-profile"}
        onMouseEnter={() => setNumber(2)}
        onMouseLeave={() => setNumber(0)}
      >
        Manage Profile
      </StyledLink>
      <LineBlocker $number={number} />
      <StyledLink
        to={"/manage-preferences"}
        onMouseEnter={() => setNumber(3)}
        onMouseLeave={() => setNumber(0)}
      >
        Manage Preferences
      </StyledLink>
      <LineBlocker $number={number} />
      <StyledLink
        to={"/request-artwork"}
        onMouseEnter={() => setNumber(4)}
        onMouseLeave={() => setNumber(0)}
      >
        Request Artwork
      </StyledLink>
      <LineBlocker $number={number} />
    </Container>
  )
}
