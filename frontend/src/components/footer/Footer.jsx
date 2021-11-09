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
        <StyledLink>Discover</StyledLink>
        <StyledLink>Login</StyledLink>
        <StyledLink>Sign Up</StyledLink>
        <StyledLink>How to Bid</StyledLink>
      </Column>
      <Column>
        <StyledLink>Terms of Use</StyledLink>
        <StyledLink>Bying on Aniko.Art</StyledLink>
        <StyledLink>Selling on Aniko.Art</StyledLink>
      </Column>
      <Column>
        <StyledLink>Privacy Policy</StyledLink>
        <StyledLink>Security</StyledLink>
        <StyledLink>Conditions of Sales</StyledLink>
      </Column>
      <Column>
        <SocialMediaIconSet />
      </Column>
    </Container>
  )
}
