import styled from "styled-components"
import theme from "../../../../common/theme"

export const CoverPicture = styled.img`
  position: relative;
  z-index: -1;
  width: 100%;
`

export const GradientContainer = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  cursor: ${(props) => props.$pointer && "pointer"};
  border: ${(props) =>
    props.$featureBorder && `5px solid ${theme.color.orange}`};
  background: ${(props) =>
    props.$sold &&
    props.$hover &&
    "linear-gradient(to bottom, transparent 0%, black 100%)"};
  }
`

export const SoldLabel = styled.h2`
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2em;
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
      font-size: ${theme.fontSize.small};
      color: rgba(0, 0, 0, 0.6);
      margin: 0;

      @media (max-width: ${theme.mediaSize.mobileL}) {
        text-align: center;
      }
    }

    span {
      font-size: ${theme.fontSize.small};
    }
  }

  @media (max-width: ${theme.mediaSize.mobileL}) {
    flex-direction: column;
  }
`

export const PriceLink = styled.p`
  color: ${theme.color.orange};
  font-size: ${theme.fontSize.small};
  font-family: "Arial", sans-serif;
  margin: 0;
`
