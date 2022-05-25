import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PrimaryButton from "../../atoms/PrimaryButton"
import TransparentButton from "../../atoms/TransparentButton"
import DropdownInput from "../../inputs/DropdownInput"
import ErrorMessage from "../../atoms/ErrorMessage"
import {
  Container,
  Para,
  ShippingContainer,
} from "../manage-profile/styles/ManageProfile.styled"
import adminService from "../../../services/adminService"

export default function AdminDelete({ setTask, task }) {
  const [entity, setEntity] = useState(null)

  const [errorMessage, setErrorMessage] = useState("")

  const [list, setList] = useState([])
  const [dropdownSelection, setDropDownSelection] = useState("")

  useEffect(async () => {
    if (task === "deleteArtist") {
      const artists = await adminService.getArtists()
      setList(artists)
    }

    if (task === "deleteGallery") {
      const galleries = await adminService.getGalleries()
      setList(galleries)
    }

    if (task === "deletePartner") {
      const partners = await adminService.getPartners()
      setList(partners)
    }
  }, [])

  const history = useHistory()

  const validate = async () => {
    setIsLoading(true)
    let attemptSuccess = false

    if (task === "deleteArtist") {
      const deleteArtist = await adminService.deleteArtist(entity._id)
      deleteArtist.success && (attemptSuccess = true)
    }

    if (task === "deleteGallery") {
      const deleteGallery = await adminService.deleteGallery(entity._id)
      deleteGallery.success && (attemptSuccess = true)
    }

    if (task === "deletePartner") {
      const deletePartner = await adminService.deletePartner(entity._id)
      deletePartner.success && (attemptSuccess = true)
    }

    if (attemptSuccess) {
      history.go(0)
    } else {
      setErrorMessage("Something went wrong!")
      setIsLoading(false)
    }
  }

  const dropdownOptions = list.map((item) => {
    return {
      value: item.fullName,
      text: item.fullName,
    }
  })

  const changeEntity = (e) => {
    const selection = list.find((item) => item.fullName === e.target.value)
    setEntity(selection)
  }

  return (
    <Container>
      {!list.length && (
        <div>
          No entity exists to delete. Please create an entity. Click{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => history.go(0)}
          >
            here{" "}
          </span>
          to go back.
        </div>
      )}
      {list.length > 0 && !entity && (
        <div>
          <DropdownInput
            onChange={changeEntity}
            value={dropdownSelection}
            options={[{ value: "", text: "" }, ...dropdownOptions]}
            label={"Select an entity to delete:"}
            id={"entitiy"}
            name={"entity"}
          />
        </div>
      )}
      {entity && (
        <div>
          <ShippingContainer>
            <Para>Delete {entity.fullName}?</Para>
            {errorMessage && <ErrorMessage messageBody={errorMessage} />}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <TransparentButton
                onClick={() => setTask("")}
                buttonText={"Cancel"}
              />
              <PrimaryButton onClick={validate} buttonText={"Delete"} />
            </div>
          </ShippingContainer>
        </div>
      )}
    </Container>
  )
}
