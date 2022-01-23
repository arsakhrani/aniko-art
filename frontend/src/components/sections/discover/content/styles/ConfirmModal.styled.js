import styled from "styled-components"
import theme from "../../../../common/theme"

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`

export const Modal = styled.div`
  width: 50vw;
  height: 50vh;
  background-color: ${theme.color.grey};
  border-radius: 5px;
  padding: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-around;
`

export const ConfirmText = styled.p`
  font-size: 1.2em;
  margin: 0;
  margin-bottom: 2em;
`
