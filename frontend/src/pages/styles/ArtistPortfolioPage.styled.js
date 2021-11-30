import styled from "styled-components"
import defaultArtistBanner from "../../assets/images/default-banner.png"
import theme from "../../components/common/theme"

export const Banner = styled.div`
  height: 33vh;
  width: 100%;
  background-image: url(${(props) =>
    props.$bannerImage ? props.$bannerImage : defaultArtistBanner});
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
    font-family: "Arial", sans-serif;
    font-weight: 400;
    font-size: 4em;
  }
`

export const Container = styled.div`
  min-height: 100vh;
  padding: 2em 5em;
`

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  border-bottom: 1px solid ${theme.color.orange};
  padding-bottom: 3em;

  p {
    margin: 0;
    color: ${theme.color.darkGrey};

    &:nth-of-type(3) {
      color: black;
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1em;

  div {
    margin-right: 1em;
  }
`
