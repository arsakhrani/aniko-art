import React from "react"
import SocialMediaIconSet from "../atoms/SocialMediaIconSet"

export default function Footer() {
  return (
    <footer style={styles.container}>
      <div style={styles.column}>
        <p style={{ color: "#F2A16B", marginTop: 0, marginBottom: 10 }}>
          aniko_n@live.nl
        </p>
        <p style={{ color: "#F2A16B", margin: 0 }}>+31 070 157 856</p>
      </div>
      <div style={styles.column}>
        <a style={styles.link}>Discover</a>
        <a style={styles.link}>Login</a>
        <a style={styles.link}>Sign Up</a>
        <a style={styles.link}>How to Bid</a>
      </div>
      <div style={styles.column}>
        <a style={styles.link}>Terms of Use</a>
        <a style={styles.link}>Bying on Aniko.Art</a>
        <a style={styles.link}>Selling on Aniko.Art</a>
      </div>
      <div style={styles.column}>
        <a style={styles.link}>Privacy Policy</a>
        <a style={styles.link}>Security</a>
        <a style={styles.link}>Conditions of Sales</a>
      </div>
      <div style={{ ...styles.column, marginTop: 20 }}>
        <SocialMediaIconSet />
      </div>
    </footer>
  )
}

const styles = {
  container: {
    position: "relative",
    bottom: 0,
    height: 250,
    width: "100vw",
    backgroundColor: "#F2EFE9",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
  },
  link: {
    marginBottom: 10,
    cursor: "pointer",
  },
}
