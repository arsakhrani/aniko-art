import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  height: 58vh;
  position: relative;
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
  }
`
export const CardHeading = styled.p`
  font-size: ${theme.fontSize.normal};
  margin: 0;
`

export const CardText = styled.p`
  font-size: ${theme.fontSize.xSmall};
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
`
