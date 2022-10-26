// mocking Browser APIs and modules

import React from "react";
import { render, screen, act } from "@testing-library/react";
// import { useCurrentPosition } from "react-use-geolocation";
import { Location } from "./Location";

// mock module
// jest.mock("react-use-geolocation");

beforeAll(() => {
  // mock browser API
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  };
});

const deferred = () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

test("displays the users current location", async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };
  const { promise, resolve } = deferred();
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (callback) => {
      promise.then(() => callback(fakePosition));
    }
  );

  render(<Location />);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await act(async () => {
    resolve();
    await promise;
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`
  );
});

// test("mock the module: displays the users current location", async () => {
//   const fakePosition = {
//     coords: {
//       latitude: 35,
//       longitude: 139,
//     },
//   };

//   let setReturnValue;
//   const useMockCurrentPosition = () => {
//     const state = useState([]);
//     setReturnValue = state[1];
//     return state[0];
//   };
//   useCurrentPosition.mockImplementation(useMockCurrentPosition);

//   render(<Location />);
//   expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

//   act(() => {
//     setReturnValue([fakePosition]);
//   });

//   expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
//   expect(screen.getByText(/latitude/i)).toHaveTextContent(
//     `Latitude: ${fakePosition.coords.latitude}`
//   );
//   expect(screen.getByText(/longitude/i)).toHaveTextContent(
//     `Longitude: ${fakePosition.coords.longitude}`
//   );
// });

test("test the unhappy path: displays error message when geolocation is not supported", async () => {
  const fakeError = new Error(
    "Geolocation is not supported or permission denied"
  );
  const { promise, reject } = deferred();

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      promise.catch(() => errorCallback(fakeError));
    }
  );

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await act(async () => {
    reject();
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByRole("alert")).toHaveTextContent(fakeError.message);
});
