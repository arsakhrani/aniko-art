import React from "react"
import SocialMediaIconSet from "../atoms/SocialMediaIconSet"
import { Container, Column, StyledLink } from "./styles/Footer.styled"
import theme from "../common/theme"

export default function Footer() {
  return (
    <Container>
      <Column>
        <p
          style={{ color: theme.color.orange, marginTop: 0, marginBottom: 10 }}
        >
          aniko_n@live.nl
        </p>
        <p style={{ color: theme.color.orange, margin: 0 }}>+31 070 157 856</p>
      </Column>
      <Column>
        <StyledLink to="/discover">Discover</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/register">Sign Up</StyledLink>
        <StyledLink to="/">How to Bid</StyledLink>
      </Column>
      <Column>
        <StyledLink to="/">Terms of Use</StyledLink>
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
