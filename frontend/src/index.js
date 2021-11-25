import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { store } from "./store"
import { Provider } from "react-redux"
import AuthProvider from "./context/authContext"
import ArtworksProvider from "./context/artworkContext"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ArtworksProvider>
          <App />
        </ArtworksProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
