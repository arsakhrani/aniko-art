import React, { useState } from "react"
import { ReactComponent as Search } from "../../assets/icons/search-icon.svg"

export default function DiscoverHeader() {
  const [activeTab, setActiveTab] = useState("Artists")

  return (
    <div style={styles.container}>
      <span
        style={{
          ...styles.menuItem,
          color: activeTab === "Artists" ? "#F2A16B" : " ",
        }}
        onClick={() => setActiveTab("Artists")}
      >
        Artists
      </span>
      <span
        style={{
          ...styles.menuItem,
          color: activeTab === "Artworks" ? "#F2A16B" : " ",
        }}
        onClick={() => setActiveTab("Artworks")}
      >
        Artworks
      </span>
      <span
        style={{
          ...styles.menuItem,
          color: activeTab === "Galleries" ? "#F2A16B" : " ",
        }}
        onClick={() => setActiveTab("Galleries")}
      >
        Galleries
      </span>
      <Search style={{ marginLeft: "1em" }} />
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    paddingLeft: "1em",
    paddingRight: "1em",
    borderRight: "1px solid #F2A16B",
    cursor: "pointer",
    fontSize: 18,
  },
}
