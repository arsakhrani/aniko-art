import React from 'react'
import SocialMediaIconSet from '../atoms/SocialMediaIconSet'

export default function ContactBox() {
    return (
        <div style={styles.container}>
            <div>
                <p style={{...styles.text, textDecorationColor: "#F2A16B", textDecorationThickness: 2, textDecoration: "underline", cursor:"pointer"}}>REQUEST PROJECT BROCHURE</p>
                <p style={styles.text}>aniko_n@live.nl</p>
                <p style={styles.text}>+31 070 157 856</p>
            </div>
            <SocialMediaIconSet />
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        margin: "3em",
    },
    text: {
        fontFamily: "'Crimson Text', serif",
        color: "#F2A16B",
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
    }
}