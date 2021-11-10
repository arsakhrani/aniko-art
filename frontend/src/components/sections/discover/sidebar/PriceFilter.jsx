import React, { useState } from "react"
import { Container } from "./styles/CountryFilter.styled"
import { Range } from "rc-slider"
import "rc-slider/assets/index.css"
import {
  FilteredRangeContainer,
  PriceRangeContainer,
} from "./styles/PriceFilter.styled"

import { dummyPriceRange } from "../../../../dummy-data/priceRange" //to delete

export default function PriceFilter() {
  const [filterRange, setFilterRange] = useState([
    dummyPriceRange.minPrice,
    dummyPriceRange.maxPrice,
  ])

  return (
    <Container>
      <h5>PRICE</h5>
      <PriceRangeContainer>
        <span>
          $
          {dummyPriceRange.minPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
        <span>
          $
          {dummyPriceRange.maxPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </PriceRangeContainer>
      <Range
        min={dummyPriceRange.minPrice}
        max={dummyPriceRange.maxPrice}
        step={1}
        handleStyle={[
          { backgroundColor: "#F2A16B", borderColor: "#F2A16B" },
          { backgroundColor: "#F2A16B", borderColor: "#F2A16B" },
        ]}
        trackStyle={[{ backgroundColor: "#F2A16B" }]}
        value={filterRange}
        allowCross={false}
        onChange={(values) => setFilterRange(values)}
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
