import styled from "styled-components"
import theme from "../../common/theme"

export const Container = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
  display: flex;
`

export const Icon = styled.div`
  width: 2em;
  height: 2em;
  background-color: white;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
`

export const QrContainer = styled.div`
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 15em;
  height: 20em;
  border: 3px solid ${theme.color.darkGrey};
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
    border: 10px solid ${theme.color.grey};
  }
`
