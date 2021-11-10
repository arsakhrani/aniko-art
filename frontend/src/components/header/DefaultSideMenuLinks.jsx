import React, { useState } from "react"
import {
  Container,
  StyledLink,
  LineBlocker,
} from "./styles/DefaultSideMenuLinks.styled"

export default function DefaultSideMenuLinks() {
  const [number, setNumber] = useState(0)

  return (
    <Container>
      <StyledLink
        to={"/discover"}
        onMouseEnter={() => setNumber(1)}
        onMouseLeave={() => setNumber(0)}
      >
        Discover
      </StyledLink>
      <LineBlocker $number={number} />
      <StyledLink
        to={"/"}
        onMouseEnter={() => setNumber(2)}
        onMouseLeave={() => setNumber(0)}
      >
        Login
      </StyledLink>
      <LineBlocker $number={number} />
      <StyledLink
        to={"/"}
        onMouseEnter={() => setNumber(3)}
        onMouseLeave={() => setNumber(0)}
      >
        Sign Up
      </StyledLink>
      <LineBlocker $number={number} />
      {false && (
        <StyledLink
          to={"/"}
          onMouseEnter={() => setNumber(4)}
          onMouseLeave={() => setNumber(0)}
        >
          How to Bid
        </StyledLink>
      )}
      <LineBlocker $number={number} />
    </Container>
  )
}
