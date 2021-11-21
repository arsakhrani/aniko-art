import React, { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import PrimaryButton from "../atoms/PrimaryButton"
import FileInput from "../inputs/FileInput"
import TextInput from "../inputs/TextInput"
import {
  StepContainer,
  StepLabel,
  BubbleCounter,
  ShippingContainer,
  Para,
} from "../sections/manage-profile/styles/ManageProfile.styled"
import VerifyArtist from "./VerifyArtist"
import { ReactComponent as CheckMark } from "../../assets/icons/verification-check.svg"

export default function StepOne({ type }) {
  const authContext = useContext(AuthContext)

  return (
    <StepContainer>
      <div>
        <StepLabel>
          <BubbleCounter>1</BubbleCounter>
          <span>ADD ARTIST'S INFORMATION</span>
        </StepLabel>
        <ShippingContainer>
          {type === "gallery" && <TextInput label={"Gallery name"} />}
          <TextInput label={"Artist name"} />
          <TextInput label={"Artist country"} />
          {type === "private" && !authContext.user.isVerified && (
            <VerifyArtist id={"id-picture"} />
          )}
          {type === "private" && authContext.user.isVerified && (
            <Para>
              <CheckMark style={{ marginRight: "0.5em" }} />
              Verified
            </Para>
          )}
          <TextInput label={"Title artwork"} />
          <TextInput label={"Size"} />
          <TextInput label={"Type"} />
          <TextInput label={"Year"} />
        </ShippingContainer>
      </div>
      <div>
        <StepLabel>
          <BubbleCounter>2</BubbleCounter>
          <span>UOLOAD ARTWORK</span>
        </StepLabel>
        <ShippingContainer>
          <Para>Upload images ( JPG, PNG, PDF ) MAX. 50MB</Para>
          <FileInput />
        </ShippingContainer>
        <StepLabel>
          <BubbleCounter>3</BubbleCounter>
          <span>CERTIFICATE AUTHENTICITY (OPTIONAL)</span>
        </StepLabel>
        <ShippingContainer>
          <Para>Upload image ( JPG, PNG, PDF )</Para>
          <FileInput />
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <PrimaryButton buttonText={"SUBMIT"} />
          </div>
        </ShippingContainer>
      </div>
    </StepContainer>
  )
}
