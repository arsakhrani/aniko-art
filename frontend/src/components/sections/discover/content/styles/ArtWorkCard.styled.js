import styled from "styled-components"
import theme from "../../../../common/theme"

export const CoverPicture = styled.img`
  width: 100%;
  cursor: ${(props) => props.$pointer && "pointer"};
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
  cursor: pointer;
  margin: 0;
`
