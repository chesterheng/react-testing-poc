// mocking Browser APIs and modules

import React, { useState } from "react";
import { render, screen, act } from "@testing-library/react";
import { useCurrentPosition } from "react-use-geolocation";
import { Location } from "./Location";

// mock module
jest.mock("react-use-geolocation");

test("mock the module: displays the users current location", async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };

  let setReturnValue;
  const useMockCurrentPosition = () => {
    const [position, setPosition] = useState([]);
    setReturnValue = setPosition;
    return position;
  };
  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  act(() => {
    setReturnValue([fakePosition]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`
  );
});
