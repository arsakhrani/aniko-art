import React from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import InteractiveMap from "../components/sections/homepage/interactiveMap/InteractiveMap";
import Registration from "../components/sections/homepage/registration/Registration";

export default function HomePage() {
  return (
    <div>
      <Header />
      <InteractiveMap />
      <Registration />
      <Footer />
    </div>
  );
}
