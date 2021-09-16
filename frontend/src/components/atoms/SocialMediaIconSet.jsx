import React from "react";
import { ReactComponent as Instagram } from "../../assets/icons/social-instagram-logo.svg";
import { ReactComponent as Facebook } from "../../assets/icons/social-facebook-logo.svg";
import { ReactComponent as Linkedin } from "../../assets/icons/social-linkedin-logo.svg";
import { ReactComponent as Wechat } from "../../assets/icons/social-wechat-logo.svg";

export default function SocialMediaIconSet() {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>
        <Instagram />
      </div>
      <div style={styles.icon}>
        <Linkedin />
      </div>
      <div style={styles.icon}>
        <Facebook />
      </div>
      <div style={styles.icon}>
        <Wechat />
      </div>
    </div>
  );
}

const styles = {
  container: {
    alignSelf: "flex-end",
    justifySelf: "flex-end",
    display: "flex"
  },
  icon: {
      width: "2em",
      height: "2em",
      backgroundColor: "white",
      margin: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      cursor: "pointer"
  }
};
