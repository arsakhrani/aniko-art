import styled from "styled-components"
import theme from "../../common/theme"
import { Link } from "react-router-dom"

export const Container = styled.div`
  padding-top: 25%;
  padding-left: 3em;
`

export const StyledLink = styled(Link)`
  font-size: 3em;
  cursor: pointer;
  border-bottom: 2px solid black;
  font-family: "Crimson Text", serif;

  @media (max-width: ${theme.mediaSize.tablet}) {
    font-size: 2em;
  }
`

export const LineBlocker = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${theme.color.grey};
  position: relative;
  top: -5px;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);

  &:nth-of-type(${(props) => props.$number}) {
    transform: translate3d(50vw, 0, 0);
  }
`
