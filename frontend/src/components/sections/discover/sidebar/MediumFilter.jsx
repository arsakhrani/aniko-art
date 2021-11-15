import React, { useState } from "react"
import { Container } from "./styles/CountryFilter.styled"
import { useDispatch } from "react-redux"
import { changeMedium } from "../../../../state/discover/artworkFilterSlice"

export default function MediumFilter() {
  const [index, setindex] = useState(1)

  const dispatch = useDispatch()

  const selectMedium = (value, index) => {
    setindex(index)
    dispatch(changeMedium(value))
  }

  return (
    <Container $index={index}>
      <h5>MEDIUM</h5>
      <ul>
        <li onClick={() => selectMedium("", 1)}>All</li>
        <li onClick={() => selectMedium("painting", 2)}>Painting</li>
        <li onClick={() => selectMedium("sculpture", 3)}>Sculpture</li>
        <li onClick={() => selectMedium("drawing", 4)}>Drawing</li>
        <li onClick={() => selectMedium("prints", 5)}>Prints</li>
        <li onClick={() => selectMedium("work-on-paper", 6)}>Work on paper</li>
        <li onClick={() => selectMedium("design", 7)}>Design</li>
        <li onClick={() => selectMedium("photography", 8)}>Photography</li>
        <li onClick={() => selectMedium("installation", 9)}>Installation</li>
        <li onClick={() => selectMedium("film-video", 10)}>Film/Video</li>
      </ul>
    </Container>
  )
}
