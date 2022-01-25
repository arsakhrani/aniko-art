import React from "react"
import SocialMediaIconSet from "../atoms/SocialMediaIconSet"
import { Container, Text } from "./styles/ContactBox.styled"

export default function ContactBox() {
  return (
    <Container>
      <div>
        <Text>GREEN BLOC PROJECT</Text>
        <Text>
          <a target="_blank" href={"mailto:aniko_n@live.nl"}>
            aniko_n@live.nl
          </a>
        </Text>
        <Text>
          <a href={"skype:"}>+31 070 157 856</a>
        </Text>
      </div>
      <SocialMediaIconSet />
    </Container>
  )
}
