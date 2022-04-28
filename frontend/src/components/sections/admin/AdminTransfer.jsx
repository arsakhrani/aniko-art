import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PrimaryButton from "../../atoms/PrimaryButton"
import TransparentButton from "../../atoms/TransparentButton"
import TextInput from "../../inputs/TextInput"
import DropdownInput from "../../inputs/DropdownInput"
import ErrorMessage from "../../atoms/ErrorMessage"
import {
  Container,
  Para,
  ShippingContainer,
} from "../manage-profile/styles/ManageProfile.styled"
import adminService from "../../../services/adminService"

export default function AdminCreateArt({ setTask, task }) {
  const [entity, setEntity] = useState(null)

  const [errorMessage, setErrorMessage] = useState("")

  const [artistList, setArtistList] = useState([])
  const [galleryList, setGalleryList] = useState([])
  const [partnerList, setPartnerList] = useState([])
  const [email, setEmail] = useState("")

  const [entityType, setEntityType] = useState("")

  useEffect(async () => {
    const artists = await adminService.getArtists()
    const galleries = await adminService.getGalleries()
    const partners = await adminService.getPartners()
    setArtistList(artists)
    setGalleryList(galleries)
    setPartnerList(partners)
  }, [])

  const history = useHistory()

  const validate = async () => {
    setIsLoading(true)

    const sendEmail = await adminService.sendEmail(entity._id, {
      email,
      entityType,
    })

    if (sendEmail.success) {
      history.go(0)
    } else {
      setErrorMessage("Something went wrong")
      setIsLoading(false)
    }
  }

  const artistDropdownOptions = artistList.map((item) => {
    return {
      value: item.fullName,
      text: item.fullName,
    }
  })

  const galleryDropdownOptions = galleryList.map((item) => {
    return {
      value: item.fullName,
      text: item.fullName,
    }
  })

  const partnerDropdownList = partnerList.map((item) => {
    return {
      value: item.fullName,
      text: item.fullName,
    }
  })

  const selectArtist = (e) => {
    setEntity(artistList.find((item) => item.fullName === e.target.value))
    setEntityType("artist")
  }

  const selectGallery = (e) => {
    setEntity(galleryList.find((item) => item.fullName === e.target.value))
    setEntityType("gallery")
  }

  const selectPartner = (e) => {
    setEntity(partnerList.find((item) => item.fullName === e.target.value))
    setEntityType("partner")
  }

  return (
    <Container>
      {!artistList.length && !galleryList.length && !partnerList.length && (
        <div>
          No entity exists to transfer accounts to. Please create an entity.
          Click{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setTask("")}
          >
            here{" "}
          </span>
          to go back.
        </div>
      )}
      {(artistList.length > 0 ||
        galleryList.length > 0 ||
        partnerList.length > 0) &&
        !entity && (
          <div>
            <DropdownInput
              onChange={selectArtist}
              value={""}
              options={[{ value: "", text: "" }, ...artistDropdownOptions]}
              label={"Select an artist to transfer accounts to:"}
              id={"entity"}
              name={"entity"}
            />
            <Para>--- or ---</Para>
            <DropdownInput
              onChange={selectGallery}
              value={""}
              options={[{ value: "", text: "" }, ...galleryDropdownOptions]}
              label={"Select a gallery to transfer accounts to:"}
              id={"entity"}
              name={"entity"}
            />
            <Para>--- or ---</Para>
            <DropdownInput
              onChange={selectPartner}
              value={""}
              options={[{ value: "", text: "" }, ...partnerDropdownList]}
              label={"Select a partner to transfer accounts to:"}
              id={"entity"}
              name={"entity"}
            />
          </div>
        )}
      {entity && (
        <ShippingContainer>
          <Para>
            Please choose an email and click submit to transfer the account.
          </Para>
          <TextInput
            type={"email"}
            label={"email"}
            id={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage && <ErrorMessage messageBody={errorMessage} />}
          <div>
            <TransparentButton
              buttonText={"Cancel"}
              onClick={() => setTask("")}
            />{" "}
            <PrimaryButton buttonText={"Submit"} onClick={validate} />
          </div>
        </ShippingContainer>
      )}
    </Container>
  )
}
