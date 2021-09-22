import React from 'react'
import { ReactComponent as Continent } from "../../../assets/icons/map/countries/continent.svg";


export default function InteractiveMapTwo() {
    return (
        <div style={styles.container}>
            <Continent/>
        </div>
    )
}

const styles = {
    container: {
      height: "100vh",
    },
}