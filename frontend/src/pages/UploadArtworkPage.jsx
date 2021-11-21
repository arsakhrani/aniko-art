import React from "react"
import Header from "../components/header/Header"
import UploadArtwork from "../components/sections/manage-profile/UploadArtwork"

export default function RequestArtworkPage() {
  return (
    <div>
      <Header grey={true} />
      <UploadArtwork />
    </div>
  )
}
