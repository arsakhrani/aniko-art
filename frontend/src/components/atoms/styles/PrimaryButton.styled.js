import styled from "styled-components"
import theme from "../../common/theme"

export const Button = styled.button`
  border: none;
  position: relative;
  background-color: ${theme.color.orange};
  border-radius: 5px;
  color: ${(props) => (props.$loading ? theme.color.orange : "white")};
  padding: 1.1em 3em;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  @media (max-width: ${theme.mediaSize.tablet}) {
    padding: 1.1em 2em;
  }

  @media (max-width: ${theme.mediaSize.mobileL}) {
    padding: 1.1em 1.1em;
  }
`

export const SpinnerContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -3em;
  margin-top: -1.1em;

  @media (max-width: ${theme.mediaSize.tablet}) {
    margin-left: -2em;
  }

  @media (max-width: ${theme.mediaSize.mobileL}) {
    margin-left: -1.1em;
  }
`
