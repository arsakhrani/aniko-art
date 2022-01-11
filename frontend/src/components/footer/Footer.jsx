import React from "react"
import SocialMediaIconSet from "../atoms/SocialMediaIconSet"
import { Container, Column, StyledLink } from "./styles/Footer.styled"

export default function Footer() {
  return (
    <Container>
      <Column>
        <p>aniko_n@live.nl</p>
        <p>+31 070 157 856</p>
      </Column>
      <Column>
        <StyledLink to="/discover/artworks">Discover</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/register">Sign Up</StyledLink>
      </Column>
      <Column>
        <StyledLink to="/terms-and-conditions">Terms of Use</StyledLink>
        <StyledLink to="/">Bying on Aniko.Art</StyledLink>
        <StyledLink to="/">Selling on Aniko.Art</StyledLink>
      </Column>
      <Column>
        <StyledLink to="/">Privacy Policy</StyledLink>
        <StyledLink to="/">Security</StyledLink>
        <StyledLink to="/">Conditions of Sales</StyledLink>
      </Column>
      <Column>
        <SocialMediaIconSet />
      </Column>
    </Container>
  )
}
