import styled from "styled-components"
import theme from "../../common/theme"

export const Container = styled.footer`
  position: relative;
  bottom: 0;
  height: 250px;
  width: 100vw;
  background-color: ${theme.color.grey};
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;

  &:last-of-type {
    margin-top: 20px;
  }
`

export const StyledLink = styled.a`
  margin-bottom: 10px;
  cursor: pointer;
`
