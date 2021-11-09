import styled from "styled-components"
import theme from "../../common/theme"

export const Button = styled.button`
  border: 1px solid ${theme.color.darkGrey};
  background-color: transparent;
  border-radius: 5px;
  color: ${theme.color.darkGrey};
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  justify-content: center;
  width: 49%;
  cursor: pointer;
`
