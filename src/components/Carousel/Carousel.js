import React, { useState } from "react";
import "./Carousel.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import Card from "../Card/Card";

function Carousel(props) {
  const [cardIdx, setCardIdx] = useState(0);
  const [leftArrowShowing, setLeftArrowShowing] = useState(false);
  const [rightArrowShowing, setRightArrowShowing] = useState(true);
  const card = props.cardData[cardIdx];
  const total = props.cardData.length;
  const goForward = () => {
    setCardIdx(cardIdx + 1);
    setLeftArrowShowing(true)
    if (cardIdx === props.cardData.length - 2){
      setRightArrowShowing(false);
    }
  }

  const goBackward = () => {
    setCardIdx(cardIdx - 1);
    if (cardIdx === 1){
      setLeftArrowShowing(false)
      setRightArrowShowing(true);
    } setRightArrowShowing(true);

  }

  return (
    <div className="Carousel">
      <h1>{props.title}</h1>
      <div className="Carousel-main">
        {leftArrowShowing && <i
          className="fas fa-chevron-circle-left fa-2x"
          onClick={goBackward}
          data-testid="left-arrow"
        />}
        <Card
          caption={card.caption}
          src={card.src}
          currNum={cardIdx + 1}
          totalNum={total}
        />
        {rightArrowShowing && <i
          className="fas fa-chevron-circle-right fa-2x"
          onClick={goForward}
          data-testid="right-arrow"
        />}
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  cardData: [
    {
      src: image1,
      caption: "Photo by Richard Pasquarella on Unsplash"
    },
    {
      src: image2,
      caption: "Photo by Pratik Patel on Unsplash"
    },
    {
      src: image3,
      caption: "Photo by Josh Post on Unsplash"
    }
  ],
  title: "Shells from far away beaches."
};

export default Carousel;
