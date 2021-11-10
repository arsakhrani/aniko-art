import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DiscoverPage from "./pages/DiscoverPage"
import RegisterPage from "./pages/RegisterPage"
import ManageProfilePage from "./pages/ManageProfilePage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/discover" exact component={DiscoverPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/manage-profile" exact component={ManageProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
