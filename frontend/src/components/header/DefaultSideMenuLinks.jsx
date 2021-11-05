import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function DefaultSideMenuLinks() {
  const [linkHover, setLinkHover] = useState("")

  return (
    <div style={styles.container}>
      <Link
        to={"/discover"}
        onMouseEnter={() => setLinkHover("Discover")}
        onMouseLeave={() => setLinkHover(null)}
        style={styles.link}
      >
        Discover
      </Link>
      <div
        style={{
          ...styles.lineBlocker,
          transform:
            linkHover === "Discover"
              ? "translate3d(50vw, 0, 0)"
              : "translate3d(0, 0, 0)",
        }}
      ></div>
      <a
        onMouseEnter={() => setLinkHover("Login")}
        onMouseLeave={() => setLinkHover(null)}
        style={styles.link}
      >
        Login
      </a>
      <div
        style={{
          ...styles.lineBlocker,
          transform:
            linkHover === "Login"
              ? "translate3d(50vw, 0, 0)"
              : "translate3d(0, 0, 0)",
        }}
      ></div>
      <a
        onMouseEnter={() => setLinkHover("SignUp")}
        onMouseLeave={() => setLinkHover(null)}
        style={styles.link}
      >
        Sign Up
      </a>
      <div
        style={{
          ...styles.lineBlocker,
          transform:
            linkHover === "SignUp"
              ? "translate3d(50vw, 0, 0)"
              : "translate3d(0, 0, 0)",
        }}
      ></div>
      <a
        onMouseEnter={() => setLinkHover("HowToBid")}
        onMouseLeave={() => setLinkHover(null)}
        style={styles.link}
      >
        How to Bid
      </a>
      <div
        style={{
          ...styles.lineBlocker,
          transform:
            linkHover === "HowToBid"
              ? "translate3d(50vw, 0, 0)"
              : "translate3d(0, 0, 0)",
        }}
      ></div>
    </div>
  )
}

const styles = {
  container: {
    paddingTop: "25%",
    paddingLeft: "3em",
  },
  link: {
    fontSize: "3em",
    cursor: "pointer",
    borderBottom: "2px solid black",
  },
  lineBlocker: {
    height: 3,
    width: "40%",
    backgroundColor: "#F2EFE9",
    position: "relative",
    top: -2,
    transition: "transform .3s cubic-bezier(0, .52, 0, 1)",
  },
}
