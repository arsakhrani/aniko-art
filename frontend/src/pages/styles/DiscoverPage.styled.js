import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 5fr;
  grid-template-areas: "sidebar content";

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 4fr;
  }

  @media (max-width: 940px) {
    grid-template-columns: 1fr 3fr;
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-template-areas: "content";
    padding-left: 1em;
  }
`
