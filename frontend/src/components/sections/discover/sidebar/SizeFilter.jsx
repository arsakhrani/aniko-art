import React, { useState } from "react"
import { Container } from "./styles/CountryFilter.styled"
import { useDispatch } from "react-redux"
import { changeSize } from "../../../../state/discover/discoverFilterSlice"

export default function SizeFilter() {
  const [index, setindex] = useState(1)

  const dispatch = useDispatch()

  const selectSize = (value, index) => {
    setindex(index)
    dispatch(changeSize(value))
  }

  return (
    <Container $index={index}>
      <h5>SIZE</h5>
      <ul>
        <li onClick={() => selectSize("", 1)}>All Sizes</li>
        <li onClick={() => selectSize("small", 2)}>Small</li>
        <li onClick={() => selectSize("medium", 3)}>Medium</li>
        <li onClick={() => selectSize("large", 4)}>Large</li>
      </ul>
    </Container>
  )
}
