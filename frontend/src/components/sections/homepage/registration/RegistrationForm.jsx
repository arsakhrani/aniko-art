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
  SocialContainer,
} from "./styles/RegistrationForm.styled"
import { Link, useHistory } from "react-router-dom"
import { saveInfo } from "../../../../state/registration/registrationInfoSlice"
import { useDispatch } from "react-redux"
import ErrorMessage from "../../../atoms/ErrorMessage"

export default function RegistrationForm({
  sell,
  leftFrame,
  focusLeft,
  focusRight,
}) {
  const [partnerSalesBuy, setPartnerSalesBuy] = useState(false)
  const [gallerySalesBuy, setGallerySalesBuy] = useState(false)
  const [artistSalesBuy, setArtistSalesBuy] = useState(false)
  const [sellerType, setSellerType] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSell] = useState(sell)

  const dispatch = useDispatch()

  const history = useHistory()

  const chooseSellerType = (type) => {
    setSellerType(type)
    setErrorMessage("")
  }

  const serverRootDomain = process.env.REACT_APP_SERVER_ROOT_DOMAIN

  const saveDetails = (e) => {
    e.preventDefault()
    if (isSell && !sellerType) {
      setErrorMessage("Please specify the type of seller you are.")
    } else {
      const interests = {
        partnerSales: partnerSalesBuy,
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

  const googleLogin = (leftFrame) => {
    if (leftFrame) {
      window.open(`${serverRootDomain}/api/user/auth/google/buy`, "_self")
    }

    if (!leftFrame) {
      if (sellerType) {
        sellerType === "partner" &&
          window.open(
            `${serverRootDomain}/api/user/auth/google/sell/partner`,
            "_self"
          )
        sellerType === "gallery" &&
          window.open(
            `${serverRootDomain}/api/user/auth/google/sell/gallery`,
            "_self"
          )
        sellerType === "artist" &&
          window.open(
            `${serverRootDomain}/api/user/auth/google/sell/artist`,
            "_self"
          )
      } else {
        setErrorMessage("Please specify the type of seller you are.")
      }
    }
  }

  const facebookLogin = (leftFrame) => {
    if (leftFrame) {
      window.open(`${serverRootDomain}/api/user/auth/facebook/buy`, "_self")
    }

    if (!leftFrame) {
      if (sellerType) {
        sellerType === "partner" &&
          window.open(
            `${serverRootDomain}/api/user/auth/facebook/sell/partner`,
            "_self"
          )
        sellerType === "gallery" &&
          window.open(
            `${serverRootDomain}/api/user/auth/facebook/sell/gallery`,
            "_self"
          )
        sellerType === "artist" &&
          window.open(
            `${serverRootDomain}/api/user/auth/facebook/sell/artist`,
            "_self"
          )
      } else {
        setErrorMessage("Please specify the type of seller you are.")
      }
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
          maxLength={50}
        />
        {sell ? (
          <CheckboxContainer>
            <div style={{ paddingBottom: "1em" }}>
              <RadialInput
                checked={sellerType === "partner"}
                onClick={() => chooseSellerType("partner")}
                label={"Partner Sales"}
                name={"sellerType"}
              />
            </div>
            <div style={{ paddingBottom: "1em" }}>
              <RadialInput
                checked={sellerType === "gallery"}
                onClick={() => chooseSellerType("gallery")}
                label={"Gallery Sales"}
                name={"sellerType"}
              />
            </div>
            <div style={{ paddingBottom: "1em" }}>
              <RadialInput
                checked={sellerType === "artist"}
                onClick={() => chooseSellerType("artist")}
                label={"Artist Sales"}
                name={"sellerType"}
              />
            </div>
            {errorMessage && <ErrorMessage messageBody={errorMessage} />}
          </CheckboxContainer>
        ) : (
          <CheckboxContainer>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setPartnerSalesBuy(!partnerSalesBuy)}
            >
              <CheckboxInput
                checked={partnerSalesBuy}
                label={"Partner Sales"}
                name={"partnerSales"}
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
        <SocialContainer
          $focusLeft={focusLeft}
          $focusRight={focusRight}
          $leftFrame={leftFrame}
        >
          <TransparentButton
            logo={"google"}
            buttonText={"Continue with Google"}
            onClick={() => googleLogin(leftFrame)}
          />
          <TransparentButton
            logo={"facebook"}
            buttonText={"Continue with Facebook"}
            onClick={() => facebookLogin(leftFrame)}
          />
        </SocialContainer>
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
