import React from "react"
import Header from "../components/header/Header"
import ManageProfileStepOne from "../components/sections/manage-profile/ManageProfileStepOne"

export default function ManageProfilePage() {
  return (
    <div>
      <Header grey={true} />
      <ManageProfileStepOne />
    </div>
  )
}
