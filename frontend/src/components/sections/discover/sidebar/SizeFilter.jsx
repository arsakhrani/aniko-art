import React, { useState } from "react"
import {
  Container,
  FilterTitle,
  FilterList,
} from "./styles/CollapsibleFilter.styled"
import { useDispatch } from "react-redux"
import { changeSize } from "../../../../state/discover/discoverFilterSlice"
import { ReactComponent as Arrow } from "../../../../assets/icons/arrow.svg"

export default function SizeFilter() {
  const [index, setindex] = useState(1)
  const [showMenu, setShowMenu] = useState(false)

  const dispatch = useDispatch()

  const selectSize = (value, index) => {
    setindex(index)
    dispatch(changeSize(value))
  }

  return (
    <Container $index={index}>
      <FilterTitle onClick={() => setShowMenu(!showMenu)}>
        <h5>SIZE</h5>
        <Arrow
          width={38}
          style={{
            transform: showMenu && "rotate(90deg)",
            transition: "all 0.1s linear",
            marginBottom: -5,
            marginRight: -5,
          }}
        />
      </FilterTitle>
      <FilterList $showMenu={showMenu}>
        <li onClick={() => selectSize("", 1)}>All Sizes</li>
        <li onClick={() => selectSize("small", 2)}>Small</li>
        <li onClick={() => selectSize("medium", 3)}>Medium</li>
        <li onClick={() => selectSize("large", 4)}>Large</li>
      </FilterList>
    </Container>
  )
}
