import React from 'react'
import RegistrationForm from './RegistrationForm'

export default function Registration() {
    return (
        <div style={styles.containter}>
          <RegistrationForm leftFrame={true} sell={false}/>
          <RegistrationForm leftFrame={false} sell={true}/>
        </div>
    )
}

const styles = {
    containter: {
        height: "100vh",
        display: "flex",
    }
}