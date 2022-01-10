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

    @media (max-width: 875px) {
      width: 70%;
    }

    @media (max-width: ${theme.mediaSize.tablet}) {
      width: 85%;
    }

    @media (max-width: ${theme.mediaSize.mobileM}) {
      width: 93%;
    }
  }

  p {
    @media (max-width: ${theme.mediaSize.mobileM}) {
      font-size: 0.8em;
    }
  }
`

export const SocialContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 35%;
  margin-top: 3em;

  @media (max-width: 1220px) {
    width: 42%;
  }

  @media (max-width: 1220px) {
    width: 49%;
  }

  @media (max-width: 875px) {
    width: 57%;
  }

  @media (max-width: ${theme.mediaSize.tablet}) {
    width: 70%;
  }

  @media (max-width: 610px) {
    flex-direction: column;
    height: 7em;
  }
`
