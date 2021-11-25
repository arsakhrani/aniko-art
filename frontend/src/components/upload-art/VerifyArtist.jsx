import React from "react"
import { VerifyBox } from "./styles/VerifyArtist.styled"
import FileInput from "../inputs/FileInput"
import PrimaryButton from "../atoms/PrimaryButton"

export default function VerifyArtist({ id }) {
  return (
    <VerifyBox>
      <p>Upload artist ID / Passport ( JPG, PNG, PDF )</p>
      <FileInput id={id} />
      <div>
        <PrimaryButton buttonText={"VERIFY ME"} />
      </div>
    </VerifyBox>
  )
}
