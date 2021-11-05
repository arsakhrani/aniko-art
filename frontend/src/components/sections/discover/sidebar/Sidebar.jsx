import React from "react"
import CountryFilter from "./CountryFilter"

export default function Sidebar() {
  return (
    <div style={styles.container}>
      <CountryFilter />
    </div>
  )
}

const styles = {
  container: {
    width: "15%",
    display: "sticky",
    height: "100vh",
  },
}
