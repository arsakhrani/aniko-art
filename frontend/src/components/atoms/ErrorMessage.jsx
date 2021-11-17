import React from "react"
import { ErrorMessageText } from "./styles/ErrorMessage.styled"

export default function ErrorMessage({ messageBody }) {
  return <ErrorMessageText>{messageBody}</ErrorMessageText>
}
