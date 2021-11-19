import styled from "styled-components"
import theme from "../../common/theme"

export const Button = styled.button`
  border: 1px solid ${theme.color.black};
  background-color: ${(props) =>
    props.$selected ? `${theme.color.black}` : "transparent"};
  border-radius: 5px;
  color: ${(props) => (props.$selected ? "white" : `${theme.color.black}`)};
  padding: 0.8em 1em;
  cursor: pointer;
  margin-right: 0.5em;
  transition: all 0.3s linear;
`
