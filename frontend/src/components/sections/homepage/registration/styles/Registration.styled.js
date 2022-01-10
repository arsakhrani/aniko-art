import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  height: 100vh;
  display: flex;

  @media (max-width: ${theme.mediaSize.tablet}) {
    flex-direction: column;
    height: 200vh;
  }
`
