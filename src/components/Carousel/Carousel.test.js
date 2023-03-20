import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", () => {
  render(<Carousel/>)
})

it("matches snapshot", () => {
  const { asFragment } = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // grabs the initial page render
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // can only grab the right arrow because the left arrow isn't visible yet
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // once the rightArrow is clicked on the first image, the leftArrow is set to showing so we are able to grab it now
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // checks the page after the right arrow was clicked once then the left arrow was clicked once... should show the first image
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});


it("hides left arrow when on first image", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");
  
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
});

it("hides right arrow when on last image", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // grabs only the right arrow since the left arrow is not showing on first image
  const rightArrow = queryByTestId("right-arrow");

  // clicks right arrow twice so last image is showing
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // grabs left arrow since it is now showing since it is not on first image
  const leftArrow = queryByTestId("left-arrow");
  
  // checks that last image is showing and that the proper arrows are showing
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
});

