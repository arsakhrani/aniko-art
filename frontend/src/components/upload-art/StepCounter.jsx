import React from "react"
import { Container, CounterOne, CounterTwo } from "./styles/StepCounter.styled"

export default function StepCounter({ step, changeStep }) {
  return (
    <Container>
      <CounterOne
        onClick={() => changeStep(1)}
        style={{ cursor: step === 2 && "pointer" }}
        $step={step}
      >
        1
      </CounterOne>
      <span />
      <CounterTwo $step={step}>2</CounterTwo>
    </Container>
  )
}
