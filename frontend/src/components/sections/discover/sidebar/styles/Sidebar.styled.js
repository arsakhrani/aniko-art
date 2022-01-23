import styled from "styled-components"

export const Container = styled.div`
  grid-area: sidebar;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 450px) {
    display: none;
  }
`
