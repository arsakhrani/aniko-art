import React, { useState } from "react"
import SideMenu from "./SideMenu"
import { useHistory } from "react-router-dom"
import DiscoverHeader from "./DiscoverHeader"

export default function Header({ discover }) {
  const [toggleMenu, setToggleMenu] = useState(false)

  const [expanded, setExpanded] = useState(false)

  const toggleMenuIcon = () => {
    setToggleMenu(!toggleMenu)
  }

  const expandIcon = () => {
    setExpanded(true)
  }

  const deflateIcon = () => {
    setExpanded(false)
  }

  const history = useHistory()

  const styles = {
    container: {
      height: "3em",
      display: "flex",
      alignItems: "center",
    },
    h1: {
      fontSize: "1.5em",
      paddingLeft: "1em",
      paddingTop: "0.1em",
      cursor: "pointer",
    },
    menuContainer: {
      position: "absolute",
      top: 0,
      right: "1em",
      height: "2em",
      paddingTop: "1em",
      width: "3em",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "flex-end",
      cursor: "pointer",
      zIndex: 2,
    },
    topLine: {
      width: "100%",
      height: 2,
      backgroundColor: "black",
      borderRadius: 1,
      transform: toggleMenu ? "rotate(45deg)" : "",
      position: toggleMenu ? "absolute" : "relative",
      top: toggleMenu ? 22.5 : 0,
      transition: "transform 0.3s linear",
    },
    midLine: {
      width: expanded ? "100%" : "80%",
      height: 2,
      backgroundColor: "black",
      borderRadius: 1,
      opacity: toggleMenu ? 0 : 1,
      transition: "opacity 0.3s linear, width 0.3s linear",
    },
    bottomLine: {
      width: toggleMenu ? "100%" : expanded ? "100%" : "60%",
      height: 2,
      backgroundColor: "black",
      borderRadius: 1,
      transform: toggleMenu ? "rotate(-45deg)" : "",
      position: toggleMenu ? "absolute" : "relative",
      bottom: toggleMenu ? 22.5 : 0,
      transition: "all 0.3s linear, width 0.3s linear",
    },
  }

  return (
    <header style={styles.container}>
      <h1 onClick={() => history.push("/")} style={styles.h1}>
        Aniko.Art
      </h1>
      {discover && <DiscoverHeader />}
      <span
        onMouseEnter={() => expandIcon()}
        onMouseLeave={() => deflateIcon()}
        onClick={() => toggleMenuIcon()}
        style={styles.menuContainer}
      >
        <span style={styles.topLine}></span>
        <span style={styles.midLine}></span>
        <span style={styles.bottomLine}></span>
      </span>
      <SideMenu visible={toggleMenu} />
    </header>
  )
}
