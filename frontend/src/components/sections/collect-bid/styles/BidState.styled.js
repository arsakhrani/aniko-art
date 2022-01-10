import styled from "styled-components"
import theme from "../../../common/theme"

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${theme.color.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 1.2em;
    text-align: center;
  }
`
