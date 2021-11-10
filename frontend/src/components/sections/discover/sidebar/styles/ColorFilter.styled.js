import styled from "styled-components"

export const PalleteContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 18px;
`

export const Color = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.$color};
  cursor: pointer;
`
