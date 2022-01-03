import React from "react"
import { ReactComponent as Google } from "../../assets/icons/social-media/google-logo.svg"
import { ReactComponent as Facebook } from "../../assets/icons/social-media/social-facebook-logo.svg"
import { Button } from "./styles/TransparentButton.styled"

export default function TransparentButton({
  buttonText,
  logo,
  submit,
  onClick,
  disabled,
}) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {logo === "google" && <Google width={26} style={{ paddingRight: 8 }} />}
      {logo === "facebook" && (
        <Facebook width={17} fill={"#1b76f2"} style={{ paddingRight: 5 }} />
      )}
      <span style={{ marginTop: 2 }}>{buttonText}</span>
    </Button>
  )
}
