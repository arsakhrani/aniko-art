import React from "react"
import TextInput from "../inputs/TextInput"
import { StepContainer } from "../sections/manage-profile/styles/ManageProfile.styled"
import CheckboxInput from "../inputs/CheckboxInput"
import PrimaryButton from "../atoms/PrimaryButton"

export default function StepTwo() {
  return (
    <StepContainer>
      <div>
        <h1>Title of the artwork</h1>
        <p>IMAGE</p>
        <p>imaaaaaage</p>
      </div>
      <div>
        <p>DETAILS</p>
        <div>
          <p>Year</p>
          <span>2010</span>
        </div>
        <div>
          <p>Category</p>
          <span>Painting</span>
        </div>
        <div>
          <p>Dimension (h/w/d)</p>
          <span>5.0x3.0x1.0cm | 2.0x1.2x0.4 inch</span>
        </div>
        <p>PRICE</p>
        <p>
          Do you already know the price you would like to sell this artwork?*
        </p>
        <TextInput label={"Asking Price"} />
        <p>*We only offer from 1000 euro and up</p>
        <CheckboxInput label={"Let Aniko.Art decide the price for you"} />
        <p>
          ( The price will include <span>insurance</span> and{" "}
          <span>shipping</span>
        </p>
        <div>
          <PrimaryButton buttonText={"SUBMIT"} />
        </div>
      </div>
    </StepContainer>
  )
}
