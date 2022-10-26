import React from "react";
import { Spinner } from "./Spinner";
import { useCurrentPosition } from "react-use-geolocation";

const Location = () => {
  const [position, error] = useCurrentPosition();

  if (!position && !error) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div role="alert" style={{ color: "red" }}>
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <p>Latitude: {position.coords.latitude}</p>
      <p>Longitude: {position.coords.longitude}</p>
    </div>
  );
};

export { Location };
