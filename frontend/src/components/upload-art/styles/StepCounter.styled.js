import styled from "styled-components"
import theme from "../../common/theme"

export const Container = styled.div`
  display: flex;
  align-items: center;

  span {
    height: 2px;
    width: 25%;
    background-color: ${theme.color.orange};
  }
`

const Counter = styled.div`
  height: 1.8em;
  width: 1.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid ${theme.color.orange};
  transition: all 0.3s linear;
`
export const CounterOne = styled(Counter)`
  background-color: ${theme.color.orange};
  color: white;
`

export const CounterTwo = styled(Counter)`
  color: ${(props) => (props.$step === 2 ? "white" : theme.color.orange)};
  background-color: ${(props) =>
    props.$step === 2 ? theme.color.orange : "transparent"};
`
