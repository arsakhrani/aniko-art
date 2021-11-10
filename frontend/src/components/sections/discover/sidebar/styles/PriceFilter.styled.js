import styled from "styled-components"
import theme from "../../../../common/theme"

export const PriceRangeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  span {
    color: rgba(0, 0, 0, 0.6);
  }
`

export const FilteredRangeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  span {
    color: rgba(0, 0, 0, 0.6);
    font-size: ${theme.fontSize.xSmall};
    padding-top: 0.5em;
  }
`
