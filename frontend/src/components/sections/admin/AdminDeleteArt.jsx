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

export default function AdminDeleteArt({ setTask, task }) {
  const [entity, setEntity] = useState(null)

  const [errorMessage, setErrorMessage] = useState("")

  const [list, setList] = useState([])

  useEffect(async () => {
    const artworks = await adminService.getArtworks()
    setList(artworks)
  }, [])

  const history = useHistory()

  const validate = async () => {
    setIsLoading(true)
    const deleteArtwork = await adminService.deleteArtwork(entity._id)

    if (deleteArtwork.success) {
      history.go(0)
    } else {
      setErrorMessage("Something went wrong!")
      setIsLoading(false)
    }
  }

  const dropdownOptions = list.map((item) => {
    return {
      value: item.title,
      text: item.title,
    }
  })

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
            onChange={(e) =>
              setEntity(list.find((item) => item.title === e.target.value))
            }
            value={""}
            options={[{ value: "", text: "" }, ...dropdownOptions]}
            label={"Select an artwork to delete:"}
            id={"entitiy"}
            name={"entity"}
          />
        </div>
      )}
      {entity && (
        <div>
          <ShippingContainer>
            <Para>
              Delete {entity.title} by {entity.artist}?
            </Para>
            {errorMessage && <ErrorMessage messageBody={errorMessage} />}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <TransparentButton onClick={setTask("")} buttonText={"Cancel"} />
              <PrimaryButton onClick={validate} buttonText={"Delete"} />
            </div>
          </ShippingContainer>
        </div>
      )}
    </Container>
  )
}
