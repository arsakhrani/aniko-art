import React, { useState } from "react"
import PrimaryButton from "../../atoms/PrimaryButton"
import TransparentButton from "../../atoms/TransparentButton"
import { Container, InnerContainer } from "./styles/AdminDashboard.styles"

export default function AdminDashboard({ setTask }) {
  const logOut = () => {
    window.localStorage.clear("admin_key")
    history.go(0)
  }

  return (
    <Container>
      <InnerContainer>
        <TransparentButton
          onClick={() => setTask("createArtist")}
          buttonText={"Create Artist"}
        />
        <TransparentButton
          onClick={() => setTask("editArtist")}
          buttonText={"Edit Artist"}
        />
        <TransparentButton
          onClick={() => setTask("deleteArtist")}
          buttonText={"Delete Artist"}
        />
      </InnerContainer>
      <InnerContainer>
        <TransparentButton
          onClick={() => setTask("createArtwork")}
          buttonText={"Create Artwork"}
        />
        <TransparentButton
          onClick={() => setTask("")}
          buttonText={"Edit Artwork"}
        />
        <TransparentButton
          onClick={() => setTask("deleteArtwork")}
          buttonText={"Delete Artwork"}
        />
      </InnerContainer>
      <InnerContainer>
        <TransparentButton
          onClick={() => setTask("createGallery")}
          buttonText={"Create Gallery"}
        />
        <TransparentButton
          onClick={() => setTask("editGallery")}
          buttonText={"Edit Gallery"}
        />
        <TransparentButton
          onClick={() => setTask("deleteGallery")}
          buttonText={"Delete Gallery"}
        />
      </InnerContainer>
      <InnerContainer>
        <TransparentButton
          onClick={() => setTask("createPartner")}
          buttonText={"Create Partner"}
        />
        <TransparentButton
          onClick={() => setTask("editPartner")}
          buttonText={"Edit Partner"}
        />
        <TransparentButton
          onClick={() => setTask("deletePartner")}
          buttonText={"Delete Partner"}
        />
      </InnerContainer>
      <InnerContainer>
        <TransparentButton
          onClick={() => setTask("createExhibition")}
          buttonText={"Create Exhibition"}
        />
        <TransparentButton
          onClick={() => setTask("deleteExhibition")}
          buttonText={"Delete Exhibition"}
        />
        <TransparentButton
          onClick={() => setTask("transferAccount")}
          buttonText={"Transfer Account"}
        />
      </InnerContainer>
      <PrimaryButton onClick={logOut} buttonText={"Log Out"} />
    </Container>
  )
}
