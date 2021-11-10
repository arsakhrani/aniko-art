import React, { useState } from "react"
import PrimaryButton from "../../../atoms/PrimaryButton"
import TransparentButton from "../../../atoms/TransparentButton"
import CheckboxInput from "../../../inputs/CheckboxInput"
import TextInput from "../../../inputs/TextInput"
import {
  CheckboxContainer,
  Container,
  Form,
} from "./styles/RegistrationForm.styled"
import { Link, useHistory } from "react-router-dom"
import { saveInfo } from "../../../../state/registration/registrationInfoSlice"
import { useDispatch } from "react-redux"

export default function RegistrationForm({ sell, leftFrame }) {
  const [privateSalesBuy, setPrivateSalesBuy] = useState(false)
  const [gallerySalesBuy, setGallerySalesBuy] = useState(false)
  const [artistSalesBuy, setArtistSalesBuy] = useState(false)
  const [privateSalesSell, setPrivateSalesSell] = useState(false)
  const [gallerySalesSell, setGallerySalesSell] = useState(false)
  const [artistSalesSell, setArtistSalesSell] = useState(false)
  const [isSell] = useState(sell)

  const dispatch = useDispatch()

  const history = useHistory()

  const saveDetails = (e) => {
    e.preventDefault()
    let interests = {}
    if (isSell) {
      interests = {
        privateSales: privateSalesSell,
        gallerySales: gallerySalesSell,
        artistSales: artistSalesSell,
      }
    } else {
      interests = {
        privateSales: privateSalesBuy,
        gallerySales: gallerySalesBuy,
        artistSales: artistSalesBuy,
      }
    }
    const details = {
      type: isSell ? "seller" : "buyer",
      email: e.target.email.value,
      interests,
    }
    dispatch(saveInfo(details))
    history.push("/manage-profile")
  }

  return (
    <Container $leftFrame={leftFrame}>
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
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setPrivateSalesSell(!privateSalesSell)}
            >
              <CheckboxInput
                checked={privateSalesSell}
                label={"Private Sales"}
                name={"privateSales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setGallerySalesSell(!gallerySalesSell)}
            >
              <CheckboxInput
                checked={gallerySalesSell}
                label={"Gallery Sales"}
                name={"gallerySales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setArtistSalesSell(!artistSalesSell)}
            >
              <CheckboxInput
                checked={artistSalesSell}
                label={"Artist Sales"}
                name={"artistSales"}
              />
            </div>
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
          <Link to="/" style={{ color: "#F2A16B" }}>
            SIGN IN
          </Link>
        </p>
      </Form>
    </Container>
  )
}
