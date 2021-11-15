import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  margin-left: 1em;
  margin-right: 1em;

  h5 {
    border-bottom: 1px solid black;
    padding-bottom: 2px;
  }

  li {
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    &:nth-of-type(${(props) => props.$index}) {
      color: ${theme.color.orange};
    }
  }
`
