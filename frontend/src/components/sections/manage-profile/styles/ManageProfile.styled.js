import styled from "styled-components"
import theme from "../../../common/theme"

export const Container = styled.div`
  font-family: "Arial", sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10em;
  padding: 3em 7em;
  background-color: ${theme.color.grey};
  width: 100vw;
  min-height: 100vh;

  h1 {
    font-weight: 100;
  }

  .password-container {
    width: 90%;
  }
`

export const UploadContainer = styled.div`
  font-family: "Arial", sans-serif;
  background-color: ${theme.color.grey};
  width: 100vw;
  min-height: 80vh;

  h1 {
    font-weight: 100;
  }

  .password-container {
    width: 90%;
  }
`

export const StepContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10em;
  width: 100%;
  padding-left: 7em;

  h4 {
    color: black;
  }
`

export const Para = styled.p`
  color: ${theme.color.darkGrey};

  span {
    text-decoration: underline solid black;
  }
`

export const Header = styled.div`
  font-family: "Arial", sans-serif;
  padding: 3em 7em;
  background-color: ${theme.color.grey};
  width: 100vw;

  h1 {
    font-weight: 100;
  }
`

export const BubbleCounter = styled.div`
  color: white;
  background-color: ${theme.color.orange};
  width: 18px;
  height: 18px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  margin-right: 1em;
`

export const StepLabel = styled.div`
  display: flex;

  span {
    color: ${theme.color.darkGrey};
    font-size: 0.9em;
    position: relative;
    bottom: 1px;
  }
`

export const ShippingContainer = styled.div`
  width: 100%;
  padding: 2em;

  div {
    margin-bottom: 1em;
  }
`

export const ProfileBox = styled.div`
  width: 250px;
  height: 250px;
  margin-left: auto;
  margin-right: auto;
  border: ${theme.color.darkGrey} solid 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 2em;

  p {
    color: ${theme.color.darkGrey};
    font-size: 0.9em;
    margin: 0;
  }
`

export const RadialsContainer = styled.div`
  padding: 1em 2em;

  div {
    margin-bottom: 1em;

    label {
      color: ${theme.color.darkGrey};
    }
  }
`

export const Detail = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 2fr;
  width: 90%;
  margin-bottom: 1em;
  border-bottom: 1px solid ${theme.color.darkGrey};

  &:nth-of-type(3) {
    border-bottom: none;
    margin-bottom: 5em;
  }

  p {
    margin: 0;
    margin-bottom: 5px;
  }
`

export const FileDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 2fr 1fr;
  width: 100%;
  align-items: center;

  span {
    cursor: pointer;
  }
`
