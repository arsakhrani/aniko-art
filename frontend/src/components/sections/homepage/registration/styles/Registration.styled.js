import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  height: calc(100vh - 150px);
  display: flex;

  @media (max-width: ${theme.mediaSize.tablet}) {
    flex-direction: column;
    height: 200vh;
  }
`
