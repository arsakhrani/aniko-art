import React, { useState } from "react"
import { ReactComponent as Search } from "../../assets/icons/search-icon.svg"
import { Container, MenuItem } from "./styles/DiscoverHeader.styled"

export default function DiscoverHeader() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <Container>
      <MenuItem $activeTab={activeTab} onClick={() => setActiveTab(1)}>
        Artists
      </MenuItem>
      <MenuItem $activeTab={activeTab} onClick={() => setActiveTab(2)}>
        Artworks
      </MenuItem>
      <MenuItem $activeTab={activeTab} onClick={() => setActiveTab(3)}>
        Galleries
      </MenuItem>
      <Search style={{ marginLeft: "1em" }} />
    </Container>
  )
}
