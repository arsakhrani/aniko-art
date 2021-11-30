import styled from "styled-components"
import theme from "../../common/theme"

export const Button = styled.button`
  border: 1px solid ${theme.color.darkGrey};
  background-color: transparent;
  border-radius: 5px;
  color: ${theme.color.darkGrey};
  padding: 1em 2em;
  display: flex;
  justify-content: center;
  cursor: pointer;
`
