import React from "react"
import ColorFilter from "./ColorFilter"
import MediumFilter from "./MediumFilter"
import PriceFilter from "./PriceFilter"
import SizeFilter from "./SizeFilter"

export default function OtherFilters() {
  return (
    <div>
      <PriceFilter />
      <MediumFilter />
      <SizeFilter />
      <ColorFilter />
    </div>
  )
}
