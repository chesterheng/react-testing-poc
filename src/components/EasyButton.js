import React from "react";
import { useTheme } from "../context/ThemeContext";

const styles = {
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  light: {
    color: "black",
    backgroundColor: "white",
  },
};

const EasyButton = (props) => {
  const [theme] = useTheme();
  return <button style={styles[theme]} {...props} />;
};

export { EasyButton };
