import React from "react"

export default function CountryFilter() {
  return (
    <div style={styles.container}>
      <h5 style={styles.h5}>COUNTRIES</h5>
      <ul>
        <li style={styles.country}>Albania</li>
        <li style={styles.country}>Belarus</li>
        <li style={styles.country}>Bosnia and Hercegovina</li>
        <li style={styles.country}>Bulgaria</li>
        <li style={styles.country}>Croatia</li>
        <li style={styles.country}>Czech Republic</li>
        <li style={styles.country}>Greece</li>
        <li style={styles.country}>Hungary</li>
        <li style={styles.country}>Kosovo</li>
        <li style={styles.country}>Macedonia</li>
        <li style={styles.country}>Moldova</li>
        <li style={styles.country}>Montenegro</li>
        <li style={styles.country}>Poland</li>
        <li style={styles.country}>Romania</li>
        <li style={styles.country}>Russia</li>
        <li style={styles.country}>Serbia</li>
        <li style={styles.country}>Slovakia</li>
        <li style={styles.country}>Slovenia</li>
        <li style={styles.country}>Turkey</li>
        <li style={styles.country}>Ukraine</li>
      </ul>
    </div>
  )
}

const styles = {
  container: {
    marginLeft: "1em",
    marginRight: "1em",
  },
  h5: {
    borderBottom: "1px solid black",
    paddingBottom: 2,
  },
  country: {
    opacity: 0.6,
    cursor: "pointer",
  },
}
