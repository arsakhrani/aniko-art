import React from 'react'
import ContactBox from './ContactBox'
import DefaultSideMenuLinks from './DefaultSideMenuLinks'

export default function SideMenu({ visible }) {

    const styles = {
        container: {
            position: "fixed",
            top: 0,
            right: 0,
            width: "50vw",
            height: "100vh",
            backgroundColor: "#F2EFE9",
            transform: visible ? "translate3d(0vw, 0, 0)" : "translate3d(50vw, 0, 0)",
            transition: "transform .3s cubic-bezier(0, .52, 0, 1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }
    }

    return (
        <nav style={styles.container}>
            <DefaultSideMenuLinks />
            <ContactBox />
        </nav>
    )
}
