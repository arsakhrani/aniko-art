import React from "react";
import { ReactComponent as One } from "../../../assets/icons/map/countries/one.svg";
import { ReactComponent as Two } from "../../../assets/icons/map/countries/two.svg";
import { ReactComponent as Three } from "../../../assets/icons/map/countries/three.svg";
import { ReactComponent as Four } from "../../../assets/icons/map/countries/four.svg";
import { ReactComponent as Five } from "../../../assets/icons/map/countries/five.svg";
import { ReactComponent as Six } from "../../../assets/icons/map/countries/six.svg";
import { ReactComponent as Seven } from "../../../assets/icons/map/countries/seven.svg";
import { ReactComponent as Eight } from "../../../assets/icons/map/countries/eight.svg";
import { ReactComponent as Nine } from "../../../assets/icons/map/countries/nine.svg";
import { ReactComponent as Ten } from "../../../assets/icons/map/countries/ten.svg";
import { ReactComponent as Eleven } from "../../../assets/icons/map/countries/eleven.svg";
import { ReactComponent as Twelve } from "../../../assets/icons/map/countries/twelve.svg";
import { ReactComponent as Thirteen } from "../../../assets/icons/map/countries/thirteen.svg";
import { ReactComponent as Fourteen } from "../../../assets/icons/map/countries/fourteen.svg";
import { ReactComponent as Fifteen } from "../../../assets/icons/map/countries/fifteen.svg";
import { ReactComponent as Sixteen } from "../../../assets/icons/map/countries/sixteen.svg";
import { ReactComponent as Seventeen } from "../../../assets/icons/map/countries/seventeen.svg";
import { ReactComponent as Eighteen } from "../../../assets/icons/map/countries/eighteen.svg";
import { ReactComponent as Nineteen } from "../../../assets/icons/map/countries/nineteen.svg";
import { ReactComponent as Twenty } from "../../../assets/icons/map/countries/twenty.svg";
import { ReactComponent as Twentyone } from "../../../assets/icons/map/countries/twentyone.svg";

export default function InteractiveMap() {
  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.one}>
          <One style={{ height: "40vh" }} />
        </div>
        <div style={styles.two}>
          <Two style={{ height: "15vh" }} />
        </div>
        <div style={styles.three}>
          <Three style={{ height: "22vh" }} />
        </div>
        <div style={styles.title}>
          <p style={{ fontSize: 36, margin: 0 }}>Showroom</p>
          <p style={{}}>View all artworks</p>
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.four}>
          <Four style={{ height: "23vh" }} />
        </div>
        <div style={styles.five}>
          <Five style={{ height: "11vh" }} />
        </div>
        <div style={styles.six}>
          <Six style={{ height: "14vh" }} />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.blackSea}>
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 20 }}>
            Black Sea
          </p>
        </div>
        <div style={styles.seven}>
          <Seven style={{ height: "15vh" }} />
        </div>
        <div style={styles.eight}>
          <Eight style={{ height: "23vh" }} />
        </div>
        <div style={styles.nine}>
          <Nine style={{ height: "24vh" }} />
        </div>
        <div style={styles.ten}>
          <Ten style={{ height: "47vh" }} />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.eleven}>
          <Eleven style={{ height: "24vh" }} />
        </div>
        <div style={styles.columnOne}>
          <div style={styles.twelve}>
            <Twelve style={{ height: "24vh" }} />
          </div>
          <div style={styles.thirteen}>
            <Thirteen style={{ height: "8vh" }} />
          </div>
          <div style={styles.fourteen}>
            <Fourteen style={{ height: "20vh" }} />
          </div>
        </div>
        <div style={styles.columnTwo}>
          <div style={styles.fifteen}>
            <Fifteen style={{ height: "24vh" }} />
          </div>
          <div style={styles.sixteen}>
            <Sixteen style={{ height: "20vh" }} />
          </div>
        </div>
        <div style={styles.seventeen}>
          <Seventeen style={{ height: "30vh" }} />
        </div>
        <div style={styles.eighteen}>
          <Eighteen style={{ height: "4vh" }} />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.nineteen}>
          <Nineteen style={{ height: "33vh" }} />
        </div>
        <div style={styles.aegeanSea}>
          <p style={{}}>Aegean Sea</p>
        </div>
        <div style={styles.twenty}>
          <Twenty style={{ height: "26vh" }} />
        </div>
        <div style={styles.twentyone}>
          <Twentyone style={{ height: "28vh" }} />
        </div>
        <div style={styles.adriaticSea}>
          <p style={{}}>Adriatic Sea</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
  },
  row: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  columnOne: {
    display: "flex",
    flexDirection: "column",
    marginRight: "-6.5vw",
    marginTop: "-26vh",
  },
  columnTwo: {
    display: "flex",
    flexDirection: "column",
    marginRight: "-7vw",
    marginTop: "-15.5vh",
  },
  title: {
    width: "39%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    height: "20%",
    fontFamily: "'Crimson Text', serif",
  },
  one: {
    marginRight: "-2vw",
  },
  two: {
    marginRight: "-8vw",
  },
  three: {
    marginRight: "-4vw",
  },
  four: {
    marginTop: "-26.5vh",
    marginRight: "1vw",
  },
  five: {
    marginTop: "-19.5vh",
    marginRight: "-7.5vw",
  },
  six: {
    marginTop: "-26vh",
    marginRight: "-16vw",
  },
  blackSea: {
    width: "11vw",
    height: "29vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  seven: {
    marginRight: "-2vw",
    marginTop: "-11.5vh",
  },
  eight: {
    marginRight: "-12vw",
    marginTop: "-11vh",
  },
  nine: {
    marginRight: "-18vw",
    marginTop: "-11vh",
  },
  ten: {
    marginRight: "-6vw",
    marginTop: "-17.5vh",
  },
  eleven: {
    marginRight: "14vw",
    marginTop: "-21.5vh",
  },
  thirteen: {
    position: "relative",
    left: "7vw",
    bottom: "3.5vh",
  },
  fourteen: {
    position: "relative",
    left: "8.5vw",
    bottom: "11vh",
  },
  sixteen: {
    position: "relative",
    left: "9.5vw",
    bottom: "16vh",
  },
  seventeen: {
    marginRight: "-17vw",
    marginTop: "-19.5vh",
  },
  eighteen: {
    marginRight: "-11vw",
    marginTop: "7.5vh",
  },
  nineteen: {
    marginTop: "-36vh",
    marginRight: "-3vw",
  },
  twenty: {
    marginRight: "-14vw",
    marginTop: "-26vh",
  },
  twentyone: {
    marginRight: "-5.5vw",
    marginTop: "-29vh",
  },
  aegeanSea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "14vh",
    width: "10vw",
  },
  adriaticSea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
