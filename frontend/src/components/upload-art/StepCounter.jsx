import React from "react"
import { Container, CounterOne, CounterTwo } from "./styles/StepCounter.styled"

export default function StepCounter({ step }) {
  return (
    <Container>
      <CounterOne $step={step}>1</CounterOne>
      <span />
      <CounterTwo $step={step}>2</CounterTwo>
    </Container>
  )
}
