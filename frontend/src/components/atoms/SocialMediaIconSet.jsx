import React from "react"
import { ReactComponent as Instagram } from "../../assets/icons/social-instagram-logo.svg"
import { ReactComponent as Facebook } from "../../assets/icons/social-facebook-logo.svg"
import { ReactComponent as Linkedin } from "../../assets/icons/social-linkedin-logo.svg"
import { ReactComponent as Wechat } from "../../assets/icons/social-wechat-logo.svg"
import { Container, Icon } from "./styles/SocialMediaIconSet.styled"

export default function SocialMediaIconSet() {
  return (
    <Container>
      <Icon>
        <Instagram />
      </Icon>
      <Icon>
        <Linkedin />
      </Icon>
      <Icon>
        <Facebook />
      </Icon>
      <Icon>
        <Wechat />
      </Icon>
    </Container>
  )
}
