import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { store } from "./store"
import { Provider } from "react-redux"
import AuthProvider from "./context/authContext"
import ArtworksProvider from "./context/artworkContext"
import ArtistsProvider from "./context/artistContext"
import GalleriesProvider from "./context/galleryContext"
import PartnersProvider from "./context/partnerContext"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ArtworksProvider>
          <ArtistsProvider>
            <GalleriesProvider>
              <PartnersProvider>
                <App />
              </PartnersProvider>
            </GalleriesProvider>
          </ArtistsProvider>
        </ArtworksProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
