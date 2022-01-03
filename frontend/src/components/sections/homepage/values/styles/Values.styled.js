import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${theme.color.grey};
  display: grid;
  grid-template-rows: 1fr 5fr 1fr;
  border-bottom: 1px solid white;

  h1 {
    text-align: right;
    font-family: "Arial", sans-serif;
    color: white;
    font-size: 6em;
    margin: 0;
    padding-right: 0.5em;
    position: relative;
    bottom: 0.4em;
    font-weight: 500;

    @media (max-width: ${theme.mediaSize.mobileL}) {
      font-size: 4em;
    }
  }
`

export const ScrollableContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
`

export const ValueContainer = styled.div`
  margin-top: 6em;

  h2 {
    transform: ${(props) =>
      props.$slide ? "translate3d(0, 5em, 0)" : "translate3d(0, 0, 0)"};
    font-size: 3.5em;
    font-family: "Arial", sans-serif;
    font-weight: 500;
    margin: 0;
    padding-left: 3rem;
    padding-bottom: 0.4em;
    opacity: ${(props) => props.$fade && 0};
    transition: all 0.3s linear;

    span {
      color: ${theme.color.orange};
    }

    @media (max-width: ${theme.mediaSize.laptop}) {
      font-size: 2.5em;
    }

    @media (max-width: ${theme.mediaSize.tablet}) {
      font-size: 2.2em;
    }

    @media (max-width: ${theme.mediaSize.mobileL}) {
      font-size: 2em;
    }
  }

  div {
    transform: ${(props) =>
      props.$slide ? "translate3d(0, 5em, 0)" : "translate3d(0, 0, 0)"};
    width: 7em;
    height: 2px;
    background-color: ${theme.color.orange};
    opacity: ${(props) => props.$fade && 0};
    transition: all 0.3s linear;
    transition-delay: 0.6s;

    @media (max-width: ${theme.mediaSize.laptop}) {
      width: 6em;
      margin-left: 1em;
    }

    @media (max-width: ${theme.mediaSize.tablet}) {
      width: 5em;
      margin-left: 2em;
    }

    @media (max-width: ${theme.mediaSize.mobileL}) {
      width: 4em;
      margin-left: 2em;
    }
  }

  p {
    font-family: "Arial", sans-serif;
    transform: ${(props) =>
      props.$slide ? "translate3d(0, 5em, 0)" : "translate3d(0, 0, 0)"};
    padding-left: 3rem;
    padding-top: 0.5em;
    max-width: 25em;
    font-size: 1.5em;
    color: ${theme.color.darkGrey};
    opacity: ${(props) => props.$fade && 0};
    transition: all 0.3s linear;
    transition-delay: 0.3s;

    span {
      border-radius: 5px;
      background: linear-gradient(
        180deg,
        ${theme.color.grey} 60%,
        ${theme.color.orange} 60%
      );
    }

    @media (max-width: ${theme.mediaSize.tablet}) {
      font-size: 1.3em;
    }

    @media (max-width: ${theme.mediaSize.mobileL}) {
      font-size: 1em;
    }
  }

  @media (max-width: ${theme.mediaSize.mobileM}) {
    margin-top: 3em;
  }
`

export const DotContainer = styled.div`
  height: 100%;
  width: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`

export const Dot = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 12px;
  border: 1px solid ${theme.color.orange};
  cursor: pointer;
  margin-top: 1em;
  margin-bottom: 1em;
  transition: all 0.3s linear;

  &:nth-of-type(${(props) => props.$index + 1}) {
    background-color: ${theme.color.orange};
  }
`
