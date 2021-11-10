import React from "react"
import { Button } from "./styles/PrimaryButton.styled"

export default function PrimaryButton({ buttonText, id, submit }) {
  return (
    <Button type={submit ? "submit" : "button"} id={id}>
      {buttonText}
    </Button>
  )
}
