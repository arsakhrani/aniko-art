import React from "react"
import { ReactComponent as StepOne } from "../assets/images/intro/step-one.svg"
import { ReactComponent as StepTwo } from "../assets/images/intro/step-two.svg"
import { ReactComponent as StepThree } from "../assets/images/intro/step-three.svg"
import { ReactComponent as StepFour } from "../assets/images/intro/step-four.svg"
import { ReactComponent as StepFive } from "../assets/images/intro/step-five.svg"

export default function IntroPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        opacity: 0.8,
      }}
    >
      <StepFive style={{ height: "100%", width: "100%" }} />
    </div>
  )
}
