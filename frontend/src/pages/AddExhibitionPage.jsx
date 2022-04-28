import React, { useEffect, useState, useContext } from "react"
import Header from "../components/header/Header"
import discoverService from "../services/discoverService"
import { useHistory, useParams } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { ArtistContext } from "../context/artistContext"
import TextInput from "../components/inputs/TextInput"
import {
  UploadContainer,
  StepContainer,
} from "../components/sections/manage-profile/styles/ManageProfile.styled"
import Footer from "../components/footer/Footer"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function AddExhibitionPage() {
  const { artistId } = useParams()

  const { user } = useContext(AuthContext)

  const { artists } = useContext(ArtistContext)

  const artist = artists.find((a) => a._id === artistId)

  const isOwner = user.email === artist.email

  const history = useHistory()

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [country, setCountry] = useState("")
  const [website, setWebsite] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const uploadCert = async () => {
    if (uploadDetails.certificateArray.length === 1) {
      const upload = await discoverService.uploadImages(
        uploadDetails.certificateArray
      )
      return upload
    } else {
      return []
    }
  }

  const uploadImages = async () => {
    const artImageUpload = await discoverService.uploadImages(
      uploadDetails.imagesArray
    )

    const certImageUpload = await uploadCert()

    return {
      artImageUpload,
      certImageUpload,
    }
  }

  const validateAndSubmit = async () => {
    if (price < 1000) {
      setErrorMessage(
        "Minimum price is 1000 euros. Please adjust the asking price accordingly."
      )
    } else {
      const images = await uploadImages()

      const exhibition = {}
      const exhibitionUpload = await discoverService.uploadExhibition(
        exhibition
      )
      if (exhibitionUpload.success) {
        history.push("discover")
        history.go(0)
      } else {
        //error handle
      }
    }
  }

  if (!isOwner) {
    return <div>Sorry! Something went wrong</div>
  }

  return (
    <div>
      <Header grey={true} />
      <UploadContainer>
        <StepContainer>
          <div style={{ marginBottom: "1em" }}>
            <TextInput
              value={name}
              id={"name"}
              label={"Name"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1em" }}>
            <TextInput
              value={type}
              id={"type"}
              label={"Type"}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1em" }}>
            <DatePicker
              selected={startDate}
              id={"start-date"}
              placeholderText="Start Date"
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div style={{ marginBottom: "1em" }}>
            <DatePicker
              selected={endDate}
              id={"end-date"}
              placeholderText="End Date"
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <div style={{ marginBottom: "1em" }}>
            <TextInput
              value={country}
              id={"country"}
              label={"Country"}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1em" }}>
            <TextInput
              value={website}
              id={"website"}
              label={"Website"}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </StepContainer>
      </UploadContainer>
      <Footer />
    </div>
  )
}
