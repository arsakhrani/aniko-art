import React, { useEffect } from "react"
import { ReactComponent as StepOne } from "../assets/images/intro/step-one.svg"
import "snapsvg-cjs"

export default function IntroPage() {
  const start = () => {
    const svg = document.getElementById("introduction")
    Snap(svg)
    const lineOne = Snap.select("#line-one")
    const lineTwo = Snap.select("#line-two")
    const lineThree = Snap.select("#line-three")
    const lineFour = Snap.select("#line-four")
    const gradient = Snap.selectAll(".gradient")
    const polylineOne = Snap.select("#polyline-one")
    const polylineTwo = Snap.select("#polyline-two")
    const polylineThree = Snap.select("#polyline-three")
    const polylineFour = Snap.select("#polyline-four")
    const square = Snap.select("#square")
    const logoText = Snap.select("#logo-text")
    const shiftedSquare = Snap.select("#shifted-square").node.getAttribute("d")
    const shiftedpolylineOne = Snap.select(
      "#shifted-polyline-one"
    ).node.getAttribute("points")
    const shiftedpolylineTwo = Snap.select(
      "#shifted-polyline-two"
    ).node.getAttribute("points")
    const shiftedpolylineThree = Snap.select(
      "#shifted-polyline-three"
    ).node.getAttribute("points")
    const shiftedpolylineFour = Snap.select(
      "#shifted-polyline-four"
    ).node.getAttribute("points")

    lineOne.animate({ x1: 0, y1: 0 }, 1000)
    lineTwo.animate({ x2: 841.9, y2: 0 }, 1000)
    lineThree.animate({ x2: 841.9, y2: 595.3 }, 1000)
    lineFour.animate({ x1: 0, y1: 595.3 }, 1000)

    setTimeout(() => {
      gradient.animate({ opacity: 1 }, 1000)
    }, 1000)

    setTimeout(() => {
      square.animate({ d: shiftedSquare }, 1000)
      lineOne.animate({ x2: 273.4, y2: 253.3 }, 1000)
      lineTwo.animate({ x1: 841.9, y1: 0 }, 1000)
      lineThree.animate({ x1: 841.9, y1: 595.3 }, 1000)
      lineFour.animate({ x2: 0, y2: 595.3 }, 1000)
      polylineOne.animate({ points: shiftedpolylineTwo }, 1000)
      polylineTwo.animate({ points: shiftedpolylineOne }, 1000, mina.linear)
      polylineThree.animate({ points: shiftedpolylineThree }, 1000)
      polylineFour.animate({ points: shiftedpolylineFour }, 1000)
    }, 3000)

    setTimeout(() => {
      logoText.animate({ opacity: 1 }, 1000)
    }, 4000)
  }

  useEffect(() => {
    setTimeout(() => {
      start()
    }, 1000)
  }, [])

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#3d3d3d",
      }}
    >
      <StepOne style={{ height: "100%", width: "100%" }} />
    </div>
  )
}
