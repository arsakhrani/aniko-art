import React from "react"
import { ReactComponent as Instagram } from "../../assets/icons/social-media/social-instagram-logo.svg"
import { ReactComponent as Facebook } from "../../assets/icons/social-media/social-facebook-logo.svg"
import { ReactComponent as Linkedin } from "../../assets/icons/social-media/social-linkedin-logo.svg"
import { ReactComponent as Wechat } from "../../assets/icons/social-media/social-wechat-logo.svg"
import { Container, Icon } from "./styles/SocialMediaIconSet.styled"

export default function SocialMediaIconSet() {
  return (
    <Container>
      <Icon>
        <a
          target="_blank"
          href="https://instagram.com/anikoarts?utm_medium=copy_link"
        >
          <Instagram />
        </a>
      </Icon>
      <Icon>
        <a target="_blank" href="">
          <Linkedin />
        </a>
      </Icon>
      <Icon>
        <a target="_blank" href="">
          <Facebook />
        </a>
      </Icon>
      <Icon>
        <Wechat />
      </Icon>
    </Container>
  )
}
