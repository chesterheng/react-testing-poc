import * as React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext";

const renderWithThemeProvider = (ui, { theme = "light", ...options } = {}) => {
  const Wrapper = ({ children }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};

export { renderWithThemeProvider };
