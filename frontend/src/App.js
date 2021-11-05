import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DiscoverPage from "./pages/DiscoverPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/discover" exact component={DiscoverPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
