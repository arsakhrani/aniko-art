import React, { useState, useContext } from "react"
import { UploadContainer, Header } from "./styles/ManageProfile.styled"
import { AuthContext } from "../../../context/authContext"
import StepCounter from "../../upload-art/StepCounter"
import StepOne from "../../upload-art/StepOne"
import StepTwo from "../../upload-art/StepTwo"

export default function UploadArtwork() {
  const authContext = useContext(AuthContext)

  const [step, setStep] = useState(1)

  const changeStep = (n) => {
    setStep(n)
  }

  return (
    <div>
      <Header>
        <h1>{authContext.user.sellerType.toUpperCase()} SELLER</h1>
        <StepCounter changeStep={(n) => changeStep(n)} step={step} />
      </Header>
      <UploadContainer>
        {step === 1 && <StepOne changeStep={(n) => changeStep(n)} />}
        {step === 2 && <StepTwo changeStep={(n) => changeStep(n)} />}
      </UploadContainer>
    </div>
  )
}
