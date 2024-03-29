import styled from "styled-components"
import theme from "../../common/theme"

export const Container = styled.header`
  display: ${(props) => props.$discover && "grid"};
  grid-template-columns: ${(props) => props.$discover && "1fr 4fr"};
  grid-template-areas:
    "brand discover"
    "searchbar searchbar";
  background-color: ${(props) => (props.$grey ? theme.color.grey : "white")};

  p.logout-login-button {
    margin-right: 6em;
    color: ${theme.color.orange};
    border-bottom: 1px solid ${theme.color.orange};
    cursor: pointer;
    position: absolute;
    right: 1em;
    top: 0;
    margin-top: 15px;
  }

  @media (max-width: ${theme.mediaSize.tablet}) {
    grid-template-areas: ${(props) =>
      props.$discover &&
      `
      "discover discover"
      "searchbar searchbar"`};

    p.logout-login-button {
      font-size: ${(props) => props.$discover && "0.8rem"};
    }
  }
`

export const MenuContainer = styled.span`
  position: absolute;
  top: 0;
  right: 1em;
  height: 2.5em;
  padding-top: 1em;
  width: 3em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  cursor: pointer;
  z-index: 4;
`

const MenuLine = styled.span`
  height: 2px;
  background-color: black;
  border-radius: 1px;
`

export const TopLine = styled(MenuLine)`
  width: 100%;
  transform: ${(props) => props.$toggleMenu && `rotate(45deg)`};
  position: ${(props) => (props.$toggleMenu ? "absolute" : "relative")};
  top: ${(props) => (props.$toggleMenu ? "22.5" : "0")};
  transition: transform 0.3s linear;
`

export const MidLine = styled(MenuLine)`
  width: ${(props) => (props.$expanded ? "100%" : "80%")};
  opacity: ${(props) => (props.$toggleMenu ? "0" : "1")};
  transition: opacity 0.3s linear, width 0.3s linear;
`

export const BottomLine = styled(MenuLine)`
  width: ${(props) =>
    props.$toggleMenu ? "100%" : props.$expanded ? "100%" : "60%"};
  transform: ${(props) => props.$toggleMenu && "rotate(-45deg)"};
  position: ${(props) => (props.$toggleMenu ? "absolute" : "relative")};
  bottom: ${(props) => (props.$toggleMenu ? "22.5" : "0")};
  transition: all 0.3s linear, width 0.3s linear;
`

export const SearchBarContainer = styled.div`
  width: 100%;
  grid-area: searchbar;
  display: flex;
  justify-content: center;
  padding-bottom: 0.3em;
  z-index: 2;

  div {
    width: 25%;
  }
`
