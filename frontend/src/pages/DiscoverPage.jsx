import React from "react"
import Header from "../components/header/Header"
import Sidebar from "../components/sections/discover/sidebar/Sidebar"

export default function DiscoverPage() {
  return (
    <div>
      <Header discover={true} />
      <Sidebar />
    </div>
  )
}
