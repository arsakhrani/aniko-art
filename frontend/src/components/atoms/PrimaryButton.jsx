import React from "react"
import { Button } from "./styles/PrimaryButton.styled"

export default function PrimaryButton({
  buttonText,
  id,
  submit,
  onClick,
  disabled,
}) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      id={id}
    >
      {buttonText}
    </Button>
  )
}
