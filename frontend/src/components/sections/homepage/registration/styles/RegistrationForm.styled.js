import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  border-${(props) => (props.$leftFrame ? "right" : "left")}: 0.5px solid ${
  theme.color.orange
};
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;

  h2 {
    font-size: 60px;
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 20px;
  }
`

export const CheckboxContainer = styled.div`
  width: 100%;
  height: 23%;
  padding-top: 7%;
`
