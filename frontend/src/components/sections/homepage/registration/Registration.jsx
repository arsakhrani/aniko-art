import React from "react"
import RegistrationForm from "./RegistrationForm"
import { Container } from "./styles/Registration.styled"

export default function Registration() {
  return (
    <Container>
      <RegistrationForm leftFrame={true} sell={false} />
      <RegistrationForm leftFrame={false} sell={true} />
    </Container>
  )
}
