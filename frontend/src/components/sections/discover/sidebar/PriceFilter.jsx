import React, { useContext, useState, useEffect } from "react"
import { Container } from "./styles/CountryFilter.styled"
import { Range } from "rc-slider"
import "rc-slider/assets/index.css"
import {
  FilteredRangeContainer,
  PriceRangeContainer,
} from "./styles/PriceFilter.styled"
import { useDispatch } from "react-redux"
import {
  changeMaxPrice,
  changeMinPrice,
} from "../../../../state/discover/discoverFilterSlice"
import { ArtworkContext } from "../../../../context/artworkContext"

export default function PriceFilter() {
  const priceArray = []
  const { artworks } = useContext(ArtworkContext)
  artworks.forEach((artwork) => priceArray.push(artwork.price))
  const minPrice = Math.min(...priceArray)
  const maxPrice = Math.max(...priceArray)

  const [filterRange, setFilterRange] = useState([minPrice, maxPrice])

  const dispatch = useDispatch()

  const adjustFilters = (values) => {
    setFilterRange(values)
    dispatch(changeMinPrice(values[0]))
    dispatch(changeMaxPrice(values[1]))
  }

  useEffect(() => {
    dispatch(changeMinPrice(minPrice))
    dispatch(changeMaxPrice(maxPrice))
    return () => {}
  }, [])

  return (
    <Container>
      <h5>PRICE</h5>
      <PriceRangeContainer>
        <span>
          ${minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
        <span>
          ${maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </PriceRangeContainer>
      <Range
        min={minPrice}
        max={maxPrice}
        step={1}
        handleStyle={[
          { backgroundColor: "#F2A16B", borderColor: "#F2A16B" },
          { backgroundColor: "#F2A16B", borderColor: "#F2A16B" },
        ]}
        trackStyle={[{ backgroundColor: "#F2A16B" }]}
        value={filterRange}
        allowCross={false}
        onChange={(values) => adjustFilters(values)}
      />
      <FilteredRangeContainer>
        <span>
          ${filterRange[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} - $
          {filterRange[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </FilteredRangeContainer>
    </Container>
  )
}
