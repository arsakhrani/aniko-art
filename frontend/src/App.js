import React, { useContext } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DiscoverPage from "./pages/DiscoverPage"
import RegisterPage from "./pages/RegisterPage"
import ManageProfilePage from "./pages/ManageProfilePage"
import NotFoundPage from "./pages/NotFoundPage"
import LogInPage from "./pages/LogInPage"
import { AuthContext } from "./context/authContext"
import { useSelector } from "react-redux"

function App() {
  const { isAuthenticated } = useContext(AuthContext)
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
            !registrationDetails && <Redirect to="/" />
          ) : (
            <ManageProfilePage />
          )}
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
