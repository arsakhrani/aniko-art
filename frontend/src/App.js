import React, { useContext } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DiscoverPage from "./pages/DiscoverPage"
import RegisterPage from "./pages/RegisterPage"
import ManageProfilePage from "./pages/ManageProfilePage"
import ManagePreferencesPage from "./pages/ManagePreferencesPage"
import NotFoundPage from "./pages/NotFoundPage"
import LogInPage from "./pages/LogInPage"
import { AuthContext } from "./context/authContext"
import { useSelector } from "react-redux"
import RequestArtworkPage from "./pages/RequestArtworkPage"

function App() {
  const { isAuthenticated, user } = useContext(AuthContext)
  const registrationDetails = useSelector(
    (state) => state.registrationInfo.value
  )
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/discover" exact component={DiscoverPage} />
        <Route path="/register" exact component={RegisterPage}>
          {isAuthenticated && <Redirect to="/" />}
        </Route>
        <Route path="/login" exact component={LogInPage}>
          {isAuthenticated && <Redirect to="/" />}
        </Route>
        <Route path="/manage-profile" exact>
          {!isAuthenticated ? (
            !registrationDetails ? (
              <Redirect to="/login" />
            ) : (
              <ManageProfilePage />
            )
          ) : (
            <ManageProfilePage />
          )}
        </Route>
        <Route path="/manage-preferences" exact>
          {isAuthenticated && user.role === "buyer" ? (
            <ManagePreferencesPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/request-artwork" exact component={RequestArtworkPage}>
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
