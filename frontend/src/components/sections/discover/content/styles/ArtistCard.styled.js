import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  height: 58vh;
`

export const FeatureImage = styled.img`
  height: 80%;
  width: 100%;
`

export const WrittenContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 20%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h4 {
      font-size: ${theme.fontSize.normal};
      margin: 0;
    }

    p {
      font-size: ${theme.fontSize.xSmall};
      color: rgba(0, 0, 0, 0.6);
      margin: 0;
    }
  }
`
