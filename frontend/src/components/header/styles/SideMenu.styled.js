import styled from "styled-components"
import theme from "../../common/theme"

export const Container = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 55vw;
  height: 100vh;
  background-color: ${theme.color.grey};
  transform: ${(props) =>
    props.$visible ? "translate3d(0vw, 0, 0)" : "translate3d(55vw, 0, 0)"};
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;

  @media (max-width: 555px) {
    width: 100vw;
    transform: ${(props) =>
      props.$visible ? "translate3d(0vw, 0, 0)" : "translate3d(100vw, 0, 0)"};
  }
`
