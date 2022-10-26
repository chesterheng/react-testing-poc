import { screen } from "@testing-library/react";
import { EasyButton } from "../components/EasyButton";
import { renderWithThemeProvider } from "../test/test-utils";

// test("renders with the light styles for the light theme", () => {
//   const Wrapper = ({ children }) => (
//     <ThemeProvider initialTheme="light">{children}</ThemeProvider>
//   );
//   render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper });
//   const button = screen.getByRole("button", { name: /easy/i });
//   expect(button).toHaveStyle(`
//     background-color: white;
//     color: black;
//   `);
// });

// test("renders with the dark styles for the dark theme", () => {
//   const Wrapper = ({ children }) => (
//     <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
//   );
//   render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper });
//   const button = screen.getByRole("button", { name: /easy/i });
//   expect(button).toHaveStyle(`
//     background-color: black;
//     color: white;
//   `);
// });

// create a custom render method
// const renderWithProviders = (ui, { theme = "light", ...options } = {}) => {
//   const Wrapper = ({ children }) => (
//     <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
//   );
//   return render(ui, { wrapper: Wrapper, ...options });
// };

// test("renders with the light styles for the light theme", () => {
//   renderWithProviders(<EasyButton>Easy</EasyButton>);
//   const button = screen.getByRole("button", { name: /easy/i });
//   expect(button).toHaveStyle(`
//     background-color: white;
//     color: black;
//   `);
// });

// test("renders with the dark styles for the dark theme", () => {
//   renderWithProviders(<EasyButton>Easy</EasyButton>, {
//     theme: "dark",
//   });
//   const button = screen.getByRole("button", { name: /easy/i });
//   expect(button).toHaveStyle(`
//     background-color: black;
//     color: white;
//   `);
// });

// swap @testing-library/react with app test utils
test("renders with the light styles for the light theme", () => {
  renderWithThemeProvider(<EasyButton>Easy</EasyButton>, { theme: "light" });
  const button = screen.getByRole("button", { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `);
});

test("renders with the dark styles for the dark theme", () => {
  renderWithThemeProvider(<EasyButton>Easy</EasyButton>, { theme: "dark" });
  const button = screen.getByRole("button", { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `);
});
