import styled from "styled-components"

export const ArtistsAndGalleriesContainer = styled.div`
  grid-area: content;
  margin-top: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 20px;
  margin-right: 1em;
  height: 100vh;
  padding-bottom: 4em;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const ArtworksContainer = styled.div`
  grid-area: content;
  height: 100vh;
  padding-bottom: 4em;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const EmptyContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

  h2 {
    margin-top: 3em;
  }
`
