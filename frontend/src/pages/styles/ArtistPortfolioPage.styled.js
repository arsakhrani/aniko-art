import styled from "styled-components"
import defaultArtistBanner from "../../assets/images/default-banner.png"
import theme from "../../components/common/theme"

export const Banner = styled.div`
  height: 33vh;
  width: 100%;
  background-image: url(${(props) =>
    props.$bannerImage ? props.$bannerImage : defaultArtistBanner});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  h1 {
    color: white;
    font-family: "Arial", sans-serif;
    font-weight: 400;
    font-size: 4em;

    @media (max-width: ${theme.mediaSize.tablet}) {
      font-size: 2.5em;
    }

    @media (max-width: ${theme.mediaSize.mobileL}) {
      font-size: 2em;
    }
  }

  @media (max-width: ${theme.mediaSize.tablet}) {
    height: 25vh;
  }
`

export const Container = styled.div`
  min-height: 100vh;
  padding: 2em 5em;

  @media (max-width: ${theme.mediaSize.tablet}) {
    padding: 2em 2em;
  }

  @media (max-width: ${theme.mediaSize.mobileL}) {
    padding: 1em 1em;
  }
`

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  border-bottom: 1px solid ${theme.color.orange};
  padding-bottom: 3em;

  @media (max-width: ${theme.mediaSize.mobileL}) {
    flex-direction: column;
    padding-bottom: 1em;
  }
`

export const InfoText = styled.p`
  margin: 0;
  color: ${theme.color.darkGrey};

  &:nth-of-type(3) {
    color: black;
  }
`

export const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1em;

  div {
    margin-right: 1em;
  }
`

export const NoArtistContainer = styled.div`
  height: 65vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    padding: 1em;
    text-align: center;
  }
`

export const EditButtonContainer = styled.div`
  @media (max-width: ${theme.mediaSize.tablet}) {
    display: none;
  }
`

export const WebsiteButtonContainer = styled.div`
  @media (max-width: ${theme.mediaSize.mobileL}) {
    margin-top: 1em;
  }
`
