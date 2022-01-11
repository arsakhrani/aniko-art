import styled from "styled-components"
import theme from "../../common/theme"
import { Link } from "react-router-dom"

export const Container = styled.footer`
  position: relative;
  bottom: 0;
  height: 180px;
  width: 100vw;
  background-color: ${theme.color.grey};
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  @media (max-width: ${theme.mediaSize.tablet}) {
    flex-wrap: wrap;
    flex-grow: 1;
  }

  @media (max-width: ${theme.mediaSize.mobileL}) {
    flex-direction: column;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;

  &:last-of-type {
    margin-top: 20px;
  }

  p {
    color: ${theme.color.orange};
    margin-top: 0px;
    margin-bottom: 10px;
  }

  @media (max-width: ${theme.mediaSize.tablet}) {
    width: 25%;

    &:nth-of-type(2) {
      width: 15%;
    }

    &:last-of-type {
      margin-top: 0px;
      padding-top: 0px;
    }
  }

  @media (max-width: ${theme.mediaSize.mobileL}) {
    flex-direction: row;
    padding-top: 0px;
    width: 100vw;
    justify-content: flex-start;
    padding-left: 1em;

    &:nth-of-type(2) {
      width: 100vw;
    }

    p {
      padding-right: 2em;
      margin-bottom: 0px;
    }
  }

  @media (max-width: ${theme.mediaSize.mobileM}) {
    font-size: 0.8rem;
  }
`

export const StyledLink = styled(Link)`
  margin-bottom: 10px;
  cursor: pointer;

  @media (max-width: ${theme.mediaSize.mobileL}) {
    padding-right: 2em;
    font-size: 0.8em;
    margin-bottom: 0px;
  }
`
