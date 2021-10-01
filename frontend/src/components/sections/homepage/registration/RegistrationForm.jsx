import React, { useState } from "react";
import PrimaryButton from "../../../atoms/PrimaryButton";
import TransparentButton from "../../../atoms/TransparentButton";
import CheckboxInput from "../../../inputs/CheckboxInput";
import TextInput from "../../../inputs/TextInput";

export default function RegistrationForm({ sell, leftFrame }) {
  const [privateSalesBuy, setPrivateSalesBuy] = useState(false);
  const [gallerySalesBuy, setGallerySalesBuy] = useState(false);
  const [artistSalesBuy, setArtistSalesBuy] = useState(false);
  const [privateSalesSell, setPrivateSalesSell] = useState(false);
  const [gallerySalesSell, setGallerySalesSell] = useState(false);
  const [artistSalesSell, setArtistSalesSell] = useState(false);

  return (
    <div style={{...styles.containter, borderRight: leftFrame ? "0.5px solid #F2A16B" : "", borderLeft: !leftFrame ? "0.5px solid #F2A16B" : ""}}>
      <div style={styles.form}>
        {sell ? (
          <h2 style={styles.title}>Sell</h2>
        ) : (
          <h2 style={styles.title}>Buy</h2>
        )}
        <p on style={styles.subtitle}>
          INTERESTED IN {sell ? <span>SELLING</span> : <span>BUYING</span>}{" "}
          ARTWORKS?
        </p>
        <TextInput label={"Email address"} type={"email"} />
        {sell ? (
          <div style={styles.checkboxContainer}>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setPrivateSalesSell(!privateSalesSell)}
            >
              <CheckboxInput
                checked={privateSalesSell}
                label={"Private Sales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setGallerySalesSell(!gallerySalesSell)}
            >
              <CheckboxInput
                checked={gallerySalesSell}
                label={"Gallery Sales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setArtistSalesSell(!artistSalesSell)}
            >
              <CheckboxInput checked={artistSalesSell} label={"Artist Sales"} />
            </div>
          </div>
        ) : (
          <div style={styles.checkboxContainer}>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setPrivateSalesBuy(!privateSalesBuy)}
            >
              <CheckboxInput
                checked={privateSalesBuy}
                label={"Private Sales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setGallerySalesBuy(!gallerySalesBuy)}
            >
              <CheckboxInput
                checked={gallerySalesBuy}
                label={"Gallery Sales"}
              />
            </div>
            <div
              style={{ paddingBottom: "1em" }}
              onClick={() => setArtistSalesBuy(!artistSalesBuy)}
            >
              <CheckboxInput checked={artistSalesBuy} label={"Artist Sales"} />
            </div>
          </div>
        )}
        <PrimaryButton buttonText={"REGISTER"} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "4em",
          }}
        >
          <TransparentButton
            logo={"google"}
            buttonText={"Continue with Google"}
          />
          <TransparentButton
            logo={"facebook"}
            buttonText={"Continue with Facebook"}
          />
        </div>
        <p style={{ marginTop: "2em"}}>
          ALREADY HAVE AN ACCOUNT? <a style={{ color: "#F2A16B"}}>SIGN IN</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  containter: {
    width: "50vw",
    fontFamily: "'Crimson Text', serif",
    display: "flex",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "65%",
  },
  title: {
    fontSize: 60,
    marginBottom: 0,
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 20,
  },
  checkboxContainer: {
    width: "100%",
    height: "23%",
    paddingTop: "7%",
  },
};
