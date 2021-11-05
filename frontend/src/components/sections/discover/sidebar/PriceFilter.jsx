import React from "react"

export default function PriceFilter() {
  return (
    <div style={styles.container}>
      <h5 style={styles.h5}>PRICE</h5>
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
}
