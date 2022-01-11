import React, { useState, useEffect } from "react"
import { Container } from "./styles/CountryFilter.styled"
import { useDispatch } from "react-redux"
import { changeMedium } from "../../../../state/discover/discoverFilterSlice"

export default function MediumFilter() {
  const [index, setindex] = useState(1)

  const dispatch = useDispatch()

  const selectMedium = (value, index) => {
    setindex(index)
    dispatch(changeMedium(value))
  }

  useEffect(() => {
    dispatch(changeMedium(""))
    return () => {}
  }, [])

  return (
    <Container $index={index}>
      <h5>MEDIUM</h5>
      <ul>
        <li onClick={() => selectMedium("", 1)}>All Mediums</li>
        <li onClick={() => selectMedium("Painting", 2)}>Painting</li>
        <li onClick={() => selectMedium("Sculpture", 3)}>Sculpture</li>
        <li onClick={() => selectMedium("Drawing", 4)}>Drawing</li>
        <li onClick={() => selectMedium("Prints", 5)}>Prints</li>
        <li onClick={() => selectMedium("Work On Paper", 6)}>Work on paper</li>
        <li onClick={() => selectMedium("Design", 7)}>Design</li>
        <li onClick={() => selectMedium("Photography", 8)}>Photography</li>
        <li onClick={() => selectMedium("Installation", 9)}>Installation</li>
        <li onClick={() => selectMedium("Film/Video", 10)}>Film/Video</li>
      </ul>
    </Container>
  )
}
