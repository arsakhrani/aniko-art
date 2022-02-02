import React, { useContext, useState } from "react"
import {
  Container,
  StyledLink,
  LineBlocker,
} from "./styles/DefaultSideMenuLinks.styled"
import { AuthContext } from "../../context/authContext"

export default function SellerSideMenuLinks() {
  const [number, setNumber] = useState(0)

  const { user } = useContext(AuthContext)

  return (
    <Container>
      <StyledLink
        to={"/discover/artworks"}
        onMouseEnter={() => setNumber(1)}
        onMouseLeave={() => setNumber(0)}
      >
        Discover
      </StyledLink>
      <LineBlocker $number={number} />
      <StyledLink
        to={"/manage-profile"}
        onMouseEnter={() => setNumber(2)}
        onMouseLeave={() => setNumber(0)}
      >
        Manage Profile
      </StyledLink>
      <LineBlocker $number={number} />
      {user.isVerifiedWithId && (
        <StyledLink
          to={"/upload-artwork"}
          onMouseEnter={() => setNumber(3)}
          onMouseLeave={() => setNumber(0)}
        >
          Upload Artwork
        </StyledLink>
      )}
      <LineBlocker $number={number} />
      <StyledLink
        to={"/request-artwork"}
        onMouseEnter={() => setNumber(4)}
        onMouseLeave={() => setNumber(0)}
      >
        Request Artwork
      </StyledLink>
      <LineBlocker $number={number} />
    </Container>
  )
}
