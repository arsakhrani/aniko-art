import styled from "styled-components"
import theme from "../../../../common/theme"

export const CoverPicture = styled.img`
  width: 100%;
  cursor: pointer;
`

export const WrittenContent = styled.div`
  display: flex;
  width: 95%;
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
    }

    span {
      font-size: ${theme.fontSize.small};
    }
  }
`
