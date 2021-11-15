import styled from "styled-components"
import theme from "../../components/common/theme"

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;

  div {
    width: 50%;
    display: flex;
    justify-content: center;
    margin-top: 1em;
  }
`
