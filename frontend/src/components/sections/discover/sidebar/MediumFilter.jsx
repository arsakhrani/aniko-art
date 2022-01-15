import React, { useState, useEffect } from "react"
import {
  Container,
  FilterList,
  FilterTitle,
} from "./styles/CollapsibleFilter.styled"
import { useDispatch } from "react-redux"
import { changeMedium } from "../../../../state/discover/discoverFilterSlice"
import { ReactComponent as Arrow } from "../../../../assets/icons/arrow.svg"

export default function MediumFilter() {
  const [index, setindex] = useState(1)
  const [showMenu, setShowMenu] = useState(false)

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
    <Container style={{ marginBottom: "-1.3em" }} $index={index}>
      <FilterTitle onClick={() => setShowMenu(!showMenu)}>
        <h5>MEDIUM</h5>
        <Arrow
          width={38}
          style={{
            transform: showMenu && "rotate(90deg)",
            transition: "all 0.15s linear",
            marginBottom: -5,
            marginRight: -5,
          }}
        />
      </FilterTitle>
      <FilterList $showMenu={showMenu}>
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
      </FilterList>
    </Container>
  )
}
