import React from "react"
import Header from "../components/header/Header"
import ManageProfile from "../components/sections/manage-profile/ManageProfile"

export default function ManageProfilePage() {
  return (
    <div>
      <Header grey={true} />
      <ManageProfile />
    </div>
  )
}
