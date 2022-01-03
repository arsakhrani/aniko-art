import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { ReactComponent as Continent } from "../../../../assets/icons/map/continent.svg"
import "./interactiveMap.css"

export default function InteractiveMap() {
  const [flag, setFlag] = useState(true)
  const [allowAnimation, setAllowAnimation] = useState(true)
  const [firstCycle, setFirstCycle] = useState(true)

  const history = useHistory()

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )

  useEffect(() => {
    const countries = document.getElementsByClassName("country")
    const animated = document.getElementsByClassName("animated")

    if (firstCycle) {
      for (let country of countries) {
        country.addEventListener("click", () => {
          history.push(`/discover/artists/?country=${country.id}`)
        })
      }
    }

    if (animated.length > 0) {
      animated[0].classList.remove("animated")
    }
    if (allowAnimation) {
      const randomIndex = Math.floor(Math.random() * (countries.length - 1))
      countries[randomIndex].classList.add("animated")
    }
    const timeOut = setTimeout(() => {
      setFirstCycle(false)
      setFlag(!flag)
    }, 3000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [flag])

  return (
    <div style={{ height: "101vh", display: vw < 1000 && "none" }}>
      <div style={styles.titleBox}>
        <h1 style={{ fontSize: 44, marginBottom: 0 }}>Showroom</h1>
        <Link to="/discover/artworks">
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
        </Link>
        <div
          style={{ height: 1, width: 135, backgroundColor: "#F2A16B" }}
        ></div>
      </div>
      <Continent
        width="100vw"
        height="100vh"
        onMouseLeave={() => setAllowAnimation(true)}
        onMouseEnter={() => setAllowAnimation(false)}
      />
    </div>
  )
}

const styles = {
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
