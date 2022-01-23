import React, { useState, useContext } from "react"
import { useSelector } from "react-redux"
import CheckboxInput from "../../inputs/CheckboxInput"
import TextInput from "../../inputs/TextInput"
import ErrorMessage from "../../atoms/ErrorMessage"
import {
  Container,
  BubbleCounter,
  StepLabel,
  ShippingContainer,
  RadialsContainer,
} from "./styles/ManageProfile.styled"
import RadialInput from "../../inputs/RadialInput"
import PrimaryButton from "../../atoms/PrimaryButton"
import authService from "../../../services/authService"
import { AuthContext } from "../../../context/authContext"
import { useHistory } from "react-router"
import DropdownInput from "../../inputs/DropdownInput"
import { countries } from "../../../services/dropdownValues"
import theme from "../../common/theme"

export default function ManageProfile() {
  const registrationDetails = useSelector(
    (state) => state.registrationInfo.value
  )

  const history = useHistory()

  const authContext = useContext(AuthContext)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  const [fullName, setFullName] = useState(authContext.user.fullName || "")
  const [website, setWebsite] = useState(authContext.user.website || "")
  const [shippingAddress, setShippingAddress] = useState({
    street: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.street
      : "",
    city: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.city
      : "",
    country: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.country
      : "",
    postCode: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.postCode
      : "",
    specialInstructions: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.specialInstructions
      : "",
  })
  const [phoneNumber, setPhoneNumber] = useState(
    authContext.user.phoneNumber || ""
  )
  const [insuranceMethod, setInsuranceMethod] = useState(
    authContext.user.insuranceMethod || ""
  )
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validate = async () => {
    if (registrationDetails) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (password !== confirmPassword) {
        setErrorMessage("passwords do not match")
      } else if (!regex.test(password)) {
        setErrorMessage(
          "password must be eight characters with at least one letter and one number"
        )
      } else if (!termsAndConditions) {
        setErrorMessage("you must agree to terms and conditions")
      } else if (!fullName) {
        setErrorMessage("Please enter a name")
      } else {
        setErrorMessage("")
        setIsLoading(true)
        const user = {
          email: registrationDetails.email,
          password,
          fullName,
          shippingAddress,
          role: registrationDetails.type,
          interests: registrationDetails.interests,
          sellerType: registrationDetails.sellerType,
          phoneNumber,
          insuranceMethod,
          website,
        }
        const registerUser = await authService.register(user)
        if (!registerUser.isAuthenticated) {
          setErrorMessage("email address is already taken")
          setIsLoading(false)
        } else {
          authContext.setUser(registerUser.user)
          authContext.setIsAuthenticated(true)

          if (registrationDetails.sellerType === "artist") {
            history.push("/discover/artists")
            history.go(0)
          } else if (registrationDetails.sellerType === "gallery") {
            history.push("/discover/galleries")
            history.go(0)
          } else {
            history.push("/discover/artworks")
            history.go(0)
          }
        }
      }
    } else {
      const user = {
        fullName,
        shippingAddress,
        phoneNumber,
        paymentMethod,
        insuranceMethod,
        website,
      }
      const updateUser = await authService.update(user, authContext.user._id)
      authContext.setUser(updateUser.user)
      if (authContext.user.sellerType === "artist") {
        history.push("/discover/artists")
      } else if (authContext.user.sellerType === "gallery") {
        history.push("/discover/galleries")
      } else {
        history.push("/discover/artworks")
      }
    }
  }

  return (
    <Container>
      <div>
        {registrationDetails && (
          <div className={"password-container"}>
            <div style={{ marginBottom: "1em" }}>
              <TextInput
                id={"password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name={"password"}
                type={"password"}
                label={"Choose a password *"}
              />
            </div>
            <div style={{ marginBottom: "1em" }}>
              <TextInput
                id={"password-confirm"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                name={"password-confirm"}
                type={"password"}
                label={"Confirm password *"}
              />
            </div>
            {errorMessage && <ErrorMessage messageBody={errorMessage} />}
            <div onClick={() => setTermsAndConditions(!termsAndConditions)}>
              <CheckboxInput
                checked={termsAndConditions}
                label={
                  "I have read and accepted the general terms and conditions *"
                }
              />
            </div>
          </div>
        )}
        <h1>Manage Profile</h1>
        <StepLabel>
          <BubbleCounter>1</BubbleCounter>
          <span>ADD YOUR SHIPPING INFORMATION</span>
        </StepLabel>
        <ShippingContainer>
          <div>
            <TextInput
              id={"full-name"}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type={"text"}
              label={
                (registrationDetails &&
                  registrationDetails.sellerType === "gallery") ||
                authContext.user.sellerType === "gallery"
                  ? "Gallery name *"
                  : "Full name *"
              }
              name={"full-name"}
            />
          </div>
          <div>
            <TextInput
              id={"street"}
              value={shippingAddress.street}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  street: e.target.value,
                })
              }
              type={"text"}
              label={"Street and house number"}
              name={"address-line-one"}
            />
          </div>
          <div>
            <TextInput
              id={"city"}
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value,
                })
              }
              type={"text"}
              label={"City"}
              name={"city"}
            />
          </div>
          <div>
            {(registrationDetails &&
              registrationDetails.sellerType === "gallery") ||
            authContext.user.sellerType === "gallery" ? (
              <DropdownInput
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                options={countries}
                label={"Country"}
                id={"country-select"}
              />
            ) : (
              <TextInput
                id={"country"}
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                type={"text"}
                label={"Country"}
                name={"country"}
              />
            )}
          </div>
          <div>
            <TextInput
              id={"postcode"}
              value={shippingAddress.postCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postCode: e.target.value,
                })
              }
              type={"text"}
              label={"Postcode"}
              name={"postcode"}
            />
          </div>
          <div>
            <TextInput
              id={"phone-number"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type={"text"}
              label={"Phone number"}
              name={"phone-number"}
            />
            <TextInput
              id={"website"}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              type={"text"}
              label={"Website"}
              name={"website"}
            />
          </div>
          <div>
            <TextInput
              id={"specia;-instructions"}
              value={shippingAddress.specialInstructions}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  specialInstructions: e.target.value,
                })
              }
              type={"text"}
              label={"Add delivery instructions ( optional )"}
              name={"delivery-instructions"}
            />
          </div>
        </ShippingContainer>
      </div>
      <div>
        <h1 style={{ color: theme.color.grey }}>SUPRISE</h1>
        <StepLabel>
          <BubbleCounter>2</BubbleCounter>
          <span>CHOOSE AN INSURANCE METHOD</span>
        </StepLabel>
        <RadialsContainer>
          <RadialInput
            onClick={() => setInsuranceMethod("AXA")}
            axaInsurance={true}
            name={"insurance-method"}
            label={"AXA"}
            checked={insuranceMethod === "AXA"}
          />
          <RadialInput
            onClick={() => setInsuranceMethod("LOREM")}
            axaInsurance={true}
            name={"insurance-method"}
            label={"Lorem Ipsum"}
            checked={insuranceMethod === "LOREM"}
          />
          <RadialInput
            onClick={() => setInsuranceMethod("IPSUM")}
            axaInsurance={true}
            name={"insurance-method"}
            label={"Lorem Ipsum"}
            checked={insuranceMethod === "IPSUM"}
          />
          <RadialInput
            onClick={() => setInsuranceMethod("HAVE-NONE")}
            name={"insurance-method"}
            label={"I have no insurance"}
            checked={insuranceMethod === "HAVE-NONE"}
          />
          <RadialInput
            onClick={() => setInsuranceMethod("NONE-NEEDED")}
            name={"insurance-method"}
            label={"No insurance needed"}
            checked={insuranceMethod === "NONE-NEEDED"}
          />
        </RadialsContainer>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row-reverse",
          }}
        >
          <PrimaryButton
            onClick={() => validate()}
            buttonText={"Save and continue"}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </Container>
  )
}
