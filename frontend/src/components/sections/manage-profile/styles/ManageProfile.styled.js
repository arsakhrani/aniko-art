import styled from "styled-components"
import theme from "../../../common/theme"

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10em;
  padding: 0em 4em;
  background-color: ${theme.color.grey};
  width: 100vw;
  min-height: 100vh;

  @media (max-width: 1210px) {
    padding: 0em 2em;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

export const UploadContainer = styled.div`
  background-color: ${theme.color.grey};
  width: 100vw;
  min-height: 80vh;

  .password-container {
    width: 90%;
  }
`

export const StepContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10em;
  width: 100%;
  padding-left: 5em;
  padding-right: 5em;

  h4 {
    color: black;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 500px) {
    padding-left: 2em;
    padding-right: 2em;
  }
`

export const Para = styled.p`
  color: ${theme.color.darkGrey};

  span {
    text-decoration: underline solid black;
  }
`

export const Header = styled.div`
  padding: 3em 5em;
  background-color: ${theme.color.grey};
  width: 100vw;

  @media (max-width: 500px) {
    padding: 3em 2em;
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
  padding-top: 2px;
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

  > div {
    margin-bottom: 1em;
  }

  @media (max-width: 1150px) {
    padding: 2em 0;
  }

  @media (max-width: 1000px) {
    width: 80%;
    padding: 2em;
  }

  @media (max-width: 650px) {
    width: 100%;
  }

  @media (max-width: 530px) {
    padding: 2em 0;
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
