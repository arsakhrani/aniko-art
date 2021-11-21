import React, { useState } from "react"
import PrimaryButton from "../../../atoms/PrimaryButton"
import TransparentButton from "../../../atoms/TransparentButton"
import CheckboxInput from "../../../inputs/CheckboxInput"
import RadialInput from "../../../inputs/RadialInput"
import TextInput from "../../../inputs/TextInput"
import {
  CheckboxContainer,
  Container,
  Form,
} from "./styles/RegistrationForm.styled"
import { Link, useHistory } from "react-router-dom"
import { saveInfo } from "../../../../state/registration/registrationInfoSlice"
import { useDispatch } from "react-redux"

export default function RegistrationForm({
  sell,
  leftFrame,
  focusLeft,
  focusRight,
}) {
  const [privateSalesBuy, setPrivateSalesBuy] = useState(false)
  const [gallerySalesBuy, setGallerySalesBuy] = useState(false)
  const [artistSalesBuy, setArtistSalesBuy] = useState(false)
  const [sellerType, setSellerType] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSell] = useState(sell)

  const dispatch = useDispatch()

  const history = useHistory()

  const saveDetails = (e) => {
    e.preventDefault()
    if (isSell && !sellerType) {
      setErrorMessage("Please select the type of seller you are")
    } else {
      const interests = {
        privateSales: privateSalesBuy,
        gallerySales: gallerySalesBuy,
        artistSales: artistSalesBuy,
      }
      const details = {
        type: isSell ? "seller" : "buyer",
        email: e.target.email.value,
        interests,
        sellerType: isSell ? sellerType : "",
      }
      dispatch(saveInfo(details))
      history.push("/manage-profile")
    }
  }

  return (
    <Container
      $focusLeft={focusLeft}
      $focusRight={focusRight}
      $leftFrame={leftFrame}
    >
      <Form
        onSubmit={(e, sell) => saveDetails(e, sell)}
        id={sell ? "seller-form" : "buyer-form"}
      >
        {sell ? <h2>Sell</h2> : <h2>Buy</h2>}
        <p>
          INTERESTED IN {sell ? <span>SELLING</span> : <span>BUYING</span>}{" "}
          ARTWORKS?
        </p>
        <TextInput
          name={"email"}
          id={sell ? "seller-email" : "buyer-email"}
          label={"Email address"}
          type={"email"}
        />
        {sell ? (
          <CheckboxContainer>
            <div style={{ paddingBottom: "1em" }}>
              <RadialInput
                checked={sellerType === "private"}
                onClick={() => setSellerType("private")}
                label={"Private Sales"}
                name={"sellerType"}
              />
            </div>
            <div style={{ paddingBottom: "1em" }}>
              <RadialInput
                checked={sellerType === "gallery"}
                onClick={() => setSellerType("gallery")}
                label={"Gallery Sales"}
                name={"sellerType"}
              />
            </div>
            <div style={{ paddingBottom: "1em" }}>
              <RadialInput
                checked={sellerType === "artist"}
                onClick={() => setSellerType("artist")}
                label={"Artist Sales"}
                name={"sellerType"}
              />
            </div>
            {errorMessage && (
              <p style={{ color: "red", marginTop: "-0.6em" }}>
                {errorMessage}
              </p>
            )}
          </CheckboxContainer>
        ) : (
          <CheckboxContainer>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setPrivateSalesBuy(!privateSalesBuy)}
            >
              <CheckboxInput
                checked={privateSalesBuy}
                label={"Private Sales"}
                name={"privateSales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setGallerySalesBuy(!gallerySalesBuy)}
            >
              <CheckboxInput
                checked={gallerySalesBuy}
                label={"Gallery Sales"}
                name={"gallerySales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setArtistSalesBuy(!artistSalesBuy)}
            >
              <CheckboxInput
                checked={artistSalesBuy}
                label={"Artist Sales"}
                name={"artistSales"}
              />
            </div>
          </CheckboxContainer>
        )}
        <PrimaryButton
          submit={true}
          id={sell ? "seller-register-button" : "buyer-register-button"}
          buttonText={"REGISTER"}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "4em",
          }}
        >
          <TransparentButton
            logo={"google"}
            buttonText={"Continue with Google"}
          />
          <TransparentButton
            logo={"facebook"}
            buttonText={"Continue with Facebook"}
          />
        </div>
        <p style={{ marginTop: "2em" }}>
          ALREADY HAVE AN ACCOUNT?{" "}
          <Link to="/login" style={{ color: "#F2A16B" }}>
            SIGN IN
          </Link>
        </p>
      </Form>
    </Container>
  )
}
