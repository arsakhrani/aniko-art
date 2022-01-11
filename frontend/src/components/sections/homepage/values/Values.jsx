import React, { useState } from "react"
import {
  Container,
  ValueContainer,
  ScrollableContainer,
  DotContainer,
  Dot,
} from "./styles/Values.styled"
import { valuesArray } from "./text"
import throttle from "lodash.throttle"

export default function Values() {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(false)

  const changeValue = (e) => {
    !(index === 4 && e.nativeEvent.wheelDelta < 0) &&
      !(index === 0 && e.nativeEvent.wheelDelta > 0) &&
      setFade(true)
    setTimeout(() => {
      index < 4 && e.nativeEvent.wheelDelta < 0 && setIndex(index + 1)
      index > 0 && e.nativeEvent.wheelDelta > 0 && setIndex(index - 1)
      if (
        (index === 0 && e.nativeEvent.wheelDelta > 0) ||
        (index === 4 && e.nativeEvent.wheelDelta < 0)
      ) {
        const body = document.getElementsByTagName("body")
        body[0].classList.remove("modal-open")
      }
      setFade(false)
    }, 1200)
  }

  const stopBodyScroll = () => {
    const body = document.getElementsByTagName("body")
    body[0].classList.add("modal-open")
  }

  const allowBodyScroll = () => {
    const body = document.getElementsByTagName("body")
    body[0].classList.remove("modal-open")
  }

  return (
    <Container>
      <h1>VALUES</h1>
      <ScrollableContainer
        onWheel={throttle((e) => changeValue(e), 3000, {
          trailing: false,
          leading: true,
        })}
      >
        <div></div>
        <ValueContainer $fade={fade}>
          <h2>
            <span>{valuesArray[index].firstWord}</span>
            {valuesArray[index].heading}
          </h2>
          <div></div>
          <p
            onMouseOver={() => stopBodyScroll()}
            onMouseLeave={() => allowBodyScroll()}
          >
            {valuesArray[index].detailsStart}
            <span key={index + "a"}>{valuesArray[index].detailsHighlight}</span>
            {valuesArray[index].detailsMid && valuesArray[index].detailsMid}
            <span key={index + "b"}>
              {valuesArray[index].detailsHighlightTwo &&
                valuesArray[index].detailsHighlightTwo}
            </span>
            {valuesArray[index].detailsEnd}
          </p>
        </ValueContainer>
        <DotContainer>
          <Dot $index={index} onClick={() => setIndex(0)} />
          <Dot $index={index} onClick={() => setIndex(1)} />
          <Dot $index={index} onClick={() => setIndex(2)} />
          <Dot $index={index} onClick={() => setIndex(3)} />
          <Dot $index={index} onClick={() => setIndex(4)} />
        </DotContainer>
      </ScrollableContainer>
    </Container>
  )
}
