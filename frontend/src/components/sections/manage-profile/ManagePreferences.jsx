import React, { useState, useContext } from "react"
import MediumButton from "../../atoms/MediumButton"
import {
  Container,
  BubbleCounter,
  StepLabel,
  ShippingContainer,
} from "./styles/ManageProfile.styled"
import TextInput from "../../inputs/TextInput"
import { AuthContext } from "../../../context/authContext"
import PrimaryButton from "../../atoms/PrimaryButton"
import authService from "../../../services/authService"
import { useHistory } from "react-router"
import theme from "../../common/theme"

export default function ManagePreferences() {
  const authContext = useContext(AuthContext)

  const history = useHistory()

  const [painting, setPainting] = useState(
    authContext.user.favoriteMedium.painting
  )
  const [sculpture, setSculpture] = useState(
    authContext.user.favoriteMedium.sculpture
  )
  const [drawing, setDrawing] = useState(
    authContext.user.favoriteMedium.drawing
  )
  const [prints, setPrints] = useState(authContext.user.favoriteMedium.prints)
  const [workOnPaper, setWorkOnPaper] = useState(
    authContext.user.favoriteMedium.workOnPaper
  )
  const [design, setDesign] = useState(authContext.user.favoriteMedium.design)
  const [photography, setPhotography] = useState(
    authContext.user.favoriteMedium.photography
  )
  const [installation, setInstallation] = useState(
    authContext.user.favoriteMedium.installation
  )
  const [filmVideo, setFilmVideo] = useState(
    authContext.user.favoriteMedium.filmVideo
  )
  const [fullName, setFullName] = useState(
    authContext.user.favoriteArtist.fullName
  )
  const [country, setCountry] = useState(
    authContext.user.favoriteArtist.country
  )
  const [style, setStyle] = useState(authContext.user.favoriteStyle.style)
  const [size, setSize] = useState(authContext.user.favoriteStyle.size)
  const [aesthetics, setAesthetics] = useState(
    authContext.user.favoriteStyle.aesthetics
  )
  const [material, setMaterial] = useState(
    authContext.user.favoriteStyle.material
  )
  const [other, setOther] = useState(authContext.user.favoriteStyle.other)

  const [isLoading, setIsLoading] = useState(false)

  const validate = async () => {
    setIsLoading(true)
    const user = {
      favoriteMedium: {
        painting,
        sculpture,
        drawing,
        prints,
        workOnPaper,
        design,
        photography,
        installation,
        filmVideo,
      },
      favoriteArtist: {
        fullName,
        country,
      },
      favoriteStyle: {
        style,
        size,
        aesthetics,
        material,
        other,
      },
    }
    const updateUser = await authService.update(user, authContext.user._id)
    if (updateUser.isAuthenticated) {
      authContext.setUser(updateUser.user)
      history.push("/discover/artworks")
      history.go(0)
    } else {
      //error handle
    }
  }

  return (
    <Container>
      <div>
        <h1>MANAGE PREFERENCES</h1>
        <StepLabel>
          <BubbleCounter>1</BubbleCounter>
          <span>ADD YOUR FAVORITE MEDIUM</span>
        </StepLabel>
        <ShippingContainer>
          <div>
            <MediumButton
              onClick={() => setPainting(!painting)}
              selected={painting}
              buttonText={"PAINTING"}
            />
            <MediumButton
              onClick={() => setSculpture(!sculpture)}
              selected={sculpture}
              buttonText={"SCULPTURE"}
            />
            <MediumButton
              onClick={() => setDrawing(!drawing)}
              selected={drawing}
              buttonText={"DRAWING"}
            />
            <MediumButton
              onClick={() => setPrints(!prints)}
              selected={prints}
              buttonText={"PRINTS"}
            />
          </div>
          <div>
            <MediumButton
              onClick={() => setWorkOnPaper(!workOnPaper)}
              selected={workOnPaper}
              buttonText={"WORK ON PAPER"}
            />
            <MediumButton
              onClick={() => setDesign(!design)}
              selected={design}
              buttonText={"DESIGN"}
            />
            <MediumButton
              onClick={() => setPhotography(!photography)}
              selected={photography}
              buttonText={"PHOTOPRAPHY"}
            />
          </div>
          <div>
            <MediumButton
              onClick={() => setInstallation(!installation)}
              selected={installation}
              buttonText={"INSTALLATION"}
            />
            <MediumButton
              onClick={() => setFilmVideo(!filmVideo)}
              selected={filmVideo}
              buttonText={"FILM/VIDEO"}
            />
          </div>
        </ShippingContainer>
        <StepLabel>
          <BubbleCounter>2</BubbleCounter>
          <span>ADD YOUR FAVORITE ARTIST (OPTIONAL)</span>
        </StepLabel>
        <ShippingContainer>
          <TextInput
            id={"full-name"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label={"Full name"}
          />
          <TextInput
            id={"country"}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label={"Country"}
          />
        </ShippingContainer>
      </div>
      <div>
        <h1 style={{ color: theme.color.grey }}>SUPRISE</h1>
        <StepLabel>
          <BubbleCounter>3</BubbleCounter>
          <span>ADD YOUR FAVORITE STYLE (OPTIONAL)</span>
        </StepLabel>
        <ShippingContainer>
          <TextInput
            id={"style"}
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            label={"Style"}
          />
          <TextInput
            id={"size"}
            value={size}
            onChange={(e) => setSize(e.target.value)}
            label={"Size"}
          />
          <TextInput
            id={"aesthetics"}
            value={aesthetics}
            onChange={(e) => setAesthetics(e.target.value)}
            label={"Aesthetics"}
          />
          <TextInput
            id={"material"}
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            label={"Material"}
          />
          <TextInput
            id={"other"}
            value={other}
            onChange={(e) => setOther(e.target.value)}
            label={"Other"}
          />
        </ShippingContainer>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row-reverse",
          }}
        >
          <PrimaryButton
            onClick={() => validate()}
            buttonText={"Save and continue"}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </Container>
  )
}
