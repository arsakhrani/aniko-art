import styled from "styled-components"
import theme from "../../common/theme"

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 25%;
  align-items: center;
  grid-area: discover;

  @media (max-width: ${theme.mediaSize.tablet}) {
    justify-content: flex-start;
    margin-top: 0.5em;
  }
`

export const MenuItem = styled.span`
    padding-left: 1em;
    padding-right: 1em;
    border-right: 1px solid ${theme.color.orange};
    cursor: pointer;
    font-size: ${theme.fontSize.small};
    font-family: "Crimson Text", serif;

    a {
      color: ${(props) => props.$activeTab && theme.color.orange};
    }

    @media (max-width: ${theme.mediaSize.tablet}) {
      font-size: ${theme.fontSize.xSmall};
      padding-right: 0.5em;
      padding-left: 0.5em;
    }
  }
`
