import styled from "styled-components"
import theme from "../../../../common/theme"

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`

export const Modal = styled.div`
  width: 98vw;
  height: 98vh;
  background-color: rgba(0, 0, 0, 0.7);
  padding-top: 1em;
  padding-right: 1em;
  padding-left: 3em;
  border-radius: 5px;
  display: grid;
  grid-template-areas:
    "gallery feature info"
    ". selector .";
  grid-template-columns: 1fr 4fr 5fr;
  grid-template-rows: 90% 10%;
  gap: 1em;

  @media (max-width: 700px) {
    grid-template-areas:
      "feature info"
      "selector .";
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-areas:
      "info"
      "feature"
      "selector";
    grid-template-columns: 1fr;
    grid-template-rows: 45% 45% 10%;
  }
`

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 0.5em;
  grid-area: gallery;

  @media (max-width: 700px) {
    display: none;
  }
`

export const GalleryPicture = styled.img`
  height: 100px;
  width: 100px;
  padding-top: 0.3em;
  cursor: pointer;
`

export const FeaturePicture = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-self: end;
  grid-area: feature;

  img {
    max-height: 85vh;
    width: 100%;

    @media (max-width: 640px) {
      max-height: 100%;
    }
  }
`

export const Info = styled.div`
  color: white;
  padding-left: 3em;
  grid-area: info;

  h2 {
    font-size: ${theme.fontSize.xxLarge};
    margin: 0;
  }

  h3 {
    font-size: ${theme.fontSize.normal};
    margin-top: 0;
    margin-bottom: 0.5em;
  }

  p {
    font-size: ${theme.fontSize.xSmall};
    margin: 0;
    opacity: 0.8;

    &:first-of-type {
      margin-top: 2em;
    }
  }

  div.basic-grid {
    @media (max-width: 640px) {
      grid-area: basic;
    }
  }

  div.purchase-grid {
    @media (max-width: 640px) {
      grid-area: purchase;
    }

    @media (max-width: 400px) {
      display: none;
    }
  }

  div.bid-grid {
    border-top: 1px solid white;
    margin-top: 1em;
    margin-right: 2em;

    h2 {
      font-size: 2em;
      margin-top: 0.5em;
    }
  }

  div.buy-art-container {
    display: flex;
    max-height: 45px;
    width: 100%;
    margin-top: 1em;

    h2 {
      margin-right: 0.2em;
    }

    @media (max-width: 850px) {
      flex-direction: column;
      margin-bottom: 3em;

      h2 {
        text-align: center;
        margin: 0;
      }
    }
  }

  div.sale-info-container {
    display: flex;

    div {
      margin-left: 1.5em;
    }

    @media (max-width: 850px) {
      flex-direction: column;

      div {
        margin: 0;
      }
    }
  }

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "basic purchase";
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-template-areas: "basic";
  }
`
export const ImageSelector = styled.div`
  height: 2em;
  grid-column-start: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-bottom: 2em;
  grid-area: selector;

  div {
    margin-left: 0.5em;
    margin-right: 0.5em;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    border: 1px solid white;
    cursor: pointer;

    &:nth-of-type(${(props) => props.$number + 1}) {
      background-color: white;
    }
  }
`

export const ChatBlock = styled.div`
  cursor: pointer;
  color: ${theme.color.orange};
  font-size: ${theme.fontSize.xSmall};

  span {
    border-bottom: solid 1px ${theme.color.orange};
  }
`
