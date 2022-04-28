import React, { useContext } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DiscoverPage from "./pages/DiscoverPage"
import ArtistPortfolioPage from "./pages/ArtistPortfolioPage"
import PartnerPortfolioPage from "./pages/PartnerPortfolioPage"
import RegisterPage from "./pages/RegisterPage"
import ManageProfilePage from "./pages/ManageProfilePage"
import ManagePreferencesPage from "./pages/ManagePreferencesPage"
import NotFoundPage from "./pages/NotFoundPage"
import LogInPage from "./pages/LogInPage"
import { AuthContext } from "./context/authContext"
import { useSelector } from "react-redux"
import RequestArtworkPage from "./pages/RequestArtworkPage"
import UploadArtworkPage from "./pages/UploadArtworkPage"
import CollectBidPage from "./pages/CollectBidPage"
import BidStatusPage from "./pages/BidStatusPage"
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import PasswordResetPage from "./pages/PasswordResetPage"
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage"
import AddExhibitionPage from "./pages/AddExhibitionPage"
import AdminPage from "./pages/AdminPage"
import TransferAccountPage from "./pages/TransferAccountPage"

function App() {
  const { isAuthenticated, user } = useContext(AuthContext)
  const registrationDetails = useSelector(
    (state) => state.registrationInfo.value
  )
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/discover/:type" exact component={DiscoverPage} />
        <Route path="/discover/" exact>
          <Redirect to="/discover/artworks" />
        </Route>
        <Route
          path="/artist-portfolio/:artistId/:section"
          exact
          component={ArtistPortfolioPage}
        />
        <Route
          path="/partner-portfolio/:partnerId/"
          exact
          component={PartnerPortfolioPage}
        />
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
        <Route path="/upload-artwork" exact>
          {user.role === "seller" && user.isVerifiedWithId ? (
            <UploadArtworkPage />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/add-exhibition/:artistId" exact>
          {user.sellerType === "artist" && user.isVerifiedWithId ? (
            <AddExhibitionPage />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/create-bid" exact>
          {isAuthenticated ? <CollectBidPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/bid-state/:artworkId/:userId/:price" exact>
          {isAuthenticated ? <BidStatusPage /> : <Redirect to="/login" />}
        </Route>
        <Route
          path="/terms-and-conditions"
          exact
          component={TermsAndConditionsPage}
        />
        <Route path="/forgot-password" exact>
          {isAuthenticated ? <Redirect to="/" /> : <ForgotPasswordPage />}
        </Route>
        <Route
          path="/password-reset/:code"
          exact
          component={PasswordResetPage}
        />
        <Route
          path="/transfer-account/:code/:id/:entityType"
          exact
          component={TransferAccountPage}
        />
        <Route path="/purchase-success/:artworkId/:buyerId" exact>
          {!isAuthenticated ? <Redirect to="/" /> : <PurchaseSuccessPage />}
        </Route>
        <Route path="/admin" exact component={AdminPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
