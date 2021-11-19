import React from "react"
import Header from "../components/header/Header"
import ManagePreferences from "../components/sections/manage-profile/ManagePreferences"

export default function ManagePreferencesPage() {
  return (
    <div>
      <Header grey={true} />
      <ManagePreferences />
    </div>
  )
}
