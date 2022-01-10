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

  @media(max-width: ${theme.mediaSize.tablet}) {
    width: 100vw;
    height: 100vh;
    border: none;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
  max-width: calc(50vw * 0.65);

  h2 {
    font-size: 60px;
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 20px;

    @media (max-width: 900px) {
      font-size: 0.8em;
    }
  }

  @media (max-width: ${theme.mediaSize.tablet}) {
    max-width: 50vw;
  }

  @media (max-width: ${theme.mediaSize.mobileL}) {
    max-width: 95vw;
  }

  @media (max-width: ${theme.mediaSize.mobileM}) {
    width: 98vw;
  }
`

export const CheckboxContainer = styled.div`
  width: 100%;
  height: 25%;
  padding-top: 7%;
`

export const SocialContainer = styled.div`
  display: flex;
  opacity: ${(props) =>
    (props.$focusLeft && !props.$leftFrame && 0.1) ||
    (props.$focusRight && props.$leftFrame && 0.1)};
  transition: 0.8s opacity linear;
  justify-content: space-between;
  width: 100%;
  margin-top: 4em;

  @media (max-width: 1320px) {
    flex-direction: column;
    margin-top: 2em;
    height: 7em;

    button {
      margin-bottom: 1em;
    }
  }
`
