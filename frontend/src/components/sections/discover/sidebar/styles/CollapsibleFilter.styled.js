import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  margin-left: 1em;
  margin-right: 1em;

  li {
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    &:nth-of-type(${(props) => props.$index}) {
      color: ${theme.color.orange};
    }
  }
`

export const FilterTitle = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;

  h5 {
    border: none;
    padding-bottom: 0;
    margin-bottom: 2px;
  }
`

export const FilterList = styled.ul`
  max-height: ${(props) => (props.$showMenu ? "300px" : "0px")};
  overflow: ${(props) => (props.$showMenu ? "" : "hidden")};
  transition: all 0.3s linear;
`
