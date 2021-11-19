import React from "react"
import { Button } from "./styles/MediumButton.styled"

export default function MediumButton({
  buttonText,
  id,
  submit,
  selected,
  onClick,
}) {
  return (
    <Button
      onClick={onClick}
      $selected={selected}
      type={submit ? "submit" : "button"}
      id={id}
    >
      {buttonText}
    </Button>
  )
}
