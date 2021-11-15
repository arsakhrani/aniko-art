import styled from "styled-components"
import theme from "../../common/theme"
import { Link } from "react-router-dom"

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

export const StyledLink = styled(Link)`
  margin-bottom: 10px;
  cursor: pointer;
`
