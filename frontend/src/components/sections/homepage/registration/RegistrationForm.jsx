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

export default function RegistrationForm({ sell, leftFrame }) {
  const [privateSalesBuy, setPrivateSalesBuy] = useState(false)
  const [gallerySalesBuy, setGallerySalesBuy] = useState(false)
  const [artistSalesBuy, setArtistSalesBuy] = useState(false)
  const [privateSalesSell, setPrivateSalesSell] = useState(false)
  const [gallerySalesSell, setGallerySalesSell] = useState(false)
  const [artistSalesSell, setArtistSalesSell] = useState(false)

  return (
    <Container $leftFrame={leftFrame}>
      <Form>
        {sell ? <h2>Sell</h2> : <h2>Buy</h2>}
        <p>
          INTERESTED IN {sell ? <span>SELLING</span> : <span>BUYING</span>}{" "}
          ARTWORKS?
        </p>
        <TextInput label={"Email address"} type={"email"} />
        {sell ? (
          <CheckboxContainer>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setPrivateSalesSell(!privateSalesSell)}
            >
              <CheckboxInput
                checked={privateSalesSell}
                label={"Private Sales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setGallerySalesSell(!gallerySalesSell)}
            >
              <CheckboxInput
                checked={gallerySalesSell}
                label={"Gallery Sales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setArtistSalesSell(!artistSalesSell)}
            >
              <CheckboxInput checked={artistSalesSell} label={"Artist Sales"} />
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
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setGallerySalesBuy(!gallerySalesBuy)}
            >
              <CheckboxInput
                checked={gallerySalesBuy}
                label={"Gallery Sales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setArtistSalesBuy(!artistSalesBuy)}
            >
              <CheckboxInput checked={artistSalesBuy} label={"Artist Sales"} />
            </div>
          </CheckboxContainer>
        )}
        <PrimaryButton buttonText={"REGISTER"} />
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
          ALREADY HAVE AN ACCOUNT? <a style={{ color: "#F2A16B" }}>SIGN IN</a>
        </p>
      </Form>
    </Container>
  )
}