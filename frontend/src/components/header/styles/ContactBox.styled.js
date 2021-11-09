import styled from "styled-components"
import theme from "../../common/theme"

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3em;
`

export const Text = styled.p`
  color: ${theme.color.orange};
  font-size ${theme.fontSize.small};
  margin-top: 5px;
  margin-bottom: 5px;

  &:first-of-type {
    text-decoration: underline ${theme.color.orange} 2px;
    cursor: pointer;
  }
`
