import styled from "styled-components"
import theme from "../../common/theme"

export const Container = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
`

export const MenuItem = styled.span`
    padding-left: 1em;
    padding-right: 1em;
    border-right: 1px solid ${theme.color.orange};
    cursor: pointer;
    font-size: ${theme.fontSize.small};

    a {
      color: ${(props) => props.$activeTab && theme.color.orange};
    }
  }
`
