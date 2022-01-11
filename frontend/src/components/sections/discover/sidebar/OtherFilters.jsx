import React from "react"
import ColorFilter from "./ColorFilter" //maybe??
import MediumFilter from "./MediumFilter"
import PriceFilter from "./PriceFilter"
import SizeFilter from "./SizeFilter"
import CountryFilter from "./CountryFilter"

export default function OtherFilters() {
  return (
    <div>
      <PriceFilter />
      <MediumFilter />
      <SizeFilter />
      <CountryFilter />
    </div>
  )
}
