import React, { useState } from "react"
import { ReactComponent as Instagram } from "../../assets/icons/social-media/social-instagram-logo.svg"
import { ReactComponent as Facebook } from "../../assets/icons/social-media/social-facebook-logo.svg"
import { ReactComponent as Linkedin } from "../../assets/icons/social-media/social-linkedin-logo.svg"
import { ReactComponent as Wechat } from "../../assets/icons/social-media/social-wechat-logo.svg"
import {
  Container,
  Icon,
  QrContainer,
} from "./styles/SocialMediaIconSet.styled"
import weChatQrCode from "../../assets/images/we-chat.jpeg"

export default function SocialMediaIconSet() {
  const [showQrCode, setShowQrCode] = useState(false)

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )

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
      {vw > 600 && (
        <Icon
          onMouseEnter={() => setShowQrCode(true)}
          onMouseLeave={() => {
            setShowQrCode(false)
          }}
        >
          <Wechat />
        </Icon>
      )}
      {showQrCode && (
        <QrContainer>
          <img alt={"WeChat QR Code"} src={weChatQrCode} />
        </QrContainer>
      )}
    </Container>
  )
}
