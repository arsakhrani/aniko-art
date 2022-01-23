import React, { useState, useContext } from "react"
import TextInput from "../../inputs/TextInput"
import { Container } from "./styles/ManageProfile.styled"
import PrimaryButton from "../../atoms/PrimaryButton"
import authService from "../../../services/authService"
import { AuthContext } from "../../../context/authContext"

export default function RequestArtwork() {
  const authContext = useContext(AuthContext)

  const [artist, setArtist] = useState("")
  const [country, setCountry] = useState("")
  const [style, setStyle] = useState("")
  const [size, setSize] = useState("")
  const [aesthetics, setAesthetics] = useState("")
  const [material, setMaterial] = useState("")
  const [other, setOther] = useState("")
  const [successMessage, setSuccessMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validate = async () => {
    setIsLoading(true)
    const request = {
      artist,
      country,
      style,
      size,
      aesthetics,
      material,
      other,
    }
    const sendRequest = await authService.requestArtwork(
      request,
      authContext.user._id
    )
    if (sendRequest.success) {
      setIsLoading(false)
      setSuccessMessage(true)
      setArtist("")
      setCountry("")
      setStyle("")
      setSize("")
      setAesthetics("")
      setMaterial("")
      setOther("")
      setDisableButton(false)
    }
  }

  return (
    <Container>
      <div>
        <h1>REQUEST ARTWORK</h1>
        <div style={{ marginBottom: "1em" }}>
          <TextInput
            id={"artist"}
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            label={"Artist"}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <TextInput
            id={"size"}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label={"Size"}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <TextInput
            id={"aesthetics"}
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            label={"Aesthetics"}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <TextInput
            id={"material"}
            value={size}
            onChange={(e) => setSize(e.target.value)}
            label={"Material"}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <TextInput
            id={"other"}
            value={aesthetics}
            onChange={(e) => setAesthetics(e.target.value)}
            label={"Other"}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <TextInput
            id={"material"}
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            label={"Material"}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <TextInput
            id={"other"}
            value={other}
            onChange={(e) => setOther(e.target.value)}
            label={"Other"}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row-reverse",
          }}
        >
          <PrimaryButton
            loading={isLoading}
            disabled={isLoading}
            onClick={() => validate()}
            buttonText={"Submit"}
          />
        </div>
      </div>
      <div>
        {successMessage && (
          <p style={{ textAlign: "center", fontSize: "1.5em" }}>
            Thank you for your request! We will get back to you shortly.
          </p>
        )}
      </div>
    </Container>
  )
}
