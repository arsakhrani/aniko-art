import React from "react"
import SocialMediaIconSet from "../atoms/SocialMediaIconSet"
import { Container, Text } from "./styles/ContactBox.styled"

export default function ContactBox() {
  return (
    <Container>
      <div>
        <Text>GREEN BLOC PROJECT</Text>
        <Text>aniko_n@live.nl</Text>
        <Text>+31 070 157 856</Text>
      </div>
      <SocialMediaIconSet />
    </Container>
  )
}
