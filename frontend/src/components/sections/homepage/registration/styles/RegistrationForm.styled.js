import styled from "styled-components"
import theme from "../../../../common/theme"

export const Container = styled.div`
  ${(props) => props.$leftFrame && props.$focusLeft && "width: 60vw"};
  ${(props) => props.$leftFrame && props.$focusRight && "width: 40vw"};
  ${(props) => !props.$leftFrame && props.$focusRight && "width: 60vw"};
  ${(props) => !props.$leftFrame && props.$focusLeft && "width: 40vw"};
  ${(props) => !props.$focusRight && !props.$focusLeft && "width: 50vw"};
  ${(props) => props.$leftFrame && props.$focusRight && "opacity: 0.2"};
  ${(props) => !props.$leftFrame && props.$focusLeft && "opacity: 0.2"};
  transition: all 1s cubic-bezier(.57,.21,.69,1.25);
  height: 100%;
  display: flex;
  justify-content: center;
  border-${(props) => (props.$leftFrame ? "right" : "left")}: 0.5px solid ${
  theme.color.orange
};
`

export const Form = styled.form`
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
