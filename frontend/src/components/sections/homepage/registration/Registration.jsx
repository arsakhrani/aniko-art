import React, { useState } from "react"
import RegistrationForm from "./RegistrationForm"
import { Container } from "./styles/Registration.styled"

export default function Registration() {
  const [focusLeft, setFocusLeft] = useState(false)
  const [focusRight, setFocusRight] = useState(false)

  return (
    <Container>
      <div
        onMouseEnter={() => setFocusLeft(true)}
        onMouseLeave={() => setFocusLeft(false)}
      >
        <RegistrationForm
          focusLeft={focusLeft}
          focusRight={focusRight}
          leftFrame={true}
          sell={false}
        />
      </div>
      <div
        onMouseEnter={() => setFocusRight(true)}
        onMouseLeave={() => setFocusRight(false)}
      >
        <RegistrationForm
          focusLeft={focusLeft}
          focusRight={focusRight}
          leftFrame={false}
          sell={true}
        />
      </div>
    </Container>
  )
}
