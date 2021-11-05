import React, { useEffect, useState } from "react"
import { ReactComponent as Continent } from "../../../../assets/icons/map/continent.svg"
import "./interactiveMap.css"

export default function InteractiveMap() {
  const [flag, setFlag] = useState(true)
  const [allowAnimation, setAllowAnimation] = useState(true)

  useEffect(() => {
    const countries = document.getElementsByClassName("country")
    const animated = document.getElementsByClassName("animated")
    if (animated.length > 0) {
      animated[0].classList.remove("animated")
    }
    if (allowAnimation) {
      const randomIndex = Math.floor(Math.random() * (countries.length - 1))
      countries[randomIndex].classList.add("animated")
    }
    setTimeout(() => {
      setFlag(!flag)
    }, 3000)
  }, [flag])

  return (
    <div style={styles.container}>
      <div style={styles.titleBox}>
        <h1 style={{ fontSize: 44, marginBottom: 0 }}>Showroom</h1>
        <p
          style={{
            color: "#F2A16B",
            marginBottom: -10,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          X VIEW ALL ARTWORKS
        </p>
        <div
          style={{ height: 1, width: 135, backgroundColor: "#F2A16B" }}
        ></div>
      </div>
      <Continent
        width="100vw"
        onMouseLeave={() => setAllowAnimation(true)}
        onMouseEnter={() => setAllowAnimation(false)}
      />
    </div>
  )
}

const styles = {
  container: {
    height: "106vh",
  },
  titleBox: {
    position: "absolute",
    width: "35%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "6em",
    justifyContent: "space-around",
  },
}
