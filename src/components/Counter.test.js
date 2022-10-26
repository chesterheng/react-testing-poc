import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { Counter } from "./Counter";

global.IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  document.body.innerHTML = "";
});

test("counter increments and decrements when the buttons are clicked", () => {
  const div = document.createElement("div");
  document.body.append(div);

  const root = createRoot(div);
  act(() => root.render(<Counter />));
  const [decrement, increment] = div.querySelectorAll("button");
  const message = div.firstChild.querySelector("div");

  expect(message.textContent).toBe("Current count: 0");
  act(() => increment.click());
  expect(message.textContent).toBe("Current count: 1");
  act(() => decrement.click());
  expect(message.textContent).toBe("Current count: 0");
});

test("use dispatchEvent: counter increments and decrements when the buttons are clicked", () => {
  const div = document.createElement("div");
  document.body.append(div);

  const root = createRoot(div);
  act(() => root.render(<Counter />));
  const [decrement, increment] = div.querySelectorAll("button");
  const message = div.firstChild.querySelector("div");

  expect(message.textContent).toBe("Current count: 0");
  const incrementClickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    button: 0,
  });
  act(() => increment.dispatchEvent(incrementClickEvent));
  expect(message.textContent).toBe("Current count: 1");
  const decrementClickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    button: 0,
  });
  act(() => decrement.dispatchEvent(decrementClickEvent));
  expect(message.textContent).toBe("Current count: 0");
});

test("React Testing Library: counter increments and decrements when the buttons are clicked ", () => {
  const { container } = render(<Counter />);
  screen.debug();
  const [decrement, increment] = container.querySelectorAll("button");
  const message = container.firstChild.querySelector("div");

  expect(message.textContent).toBe("Current count: 0");
  fireEvent.click(increment);
  expect(message.textContent).toBe("Current count: 1");
  fireEvent.click(decrement);
  expect(message.textContent).toBe("Current count: 0");
});

test("use @testing-library/jest-dom: counter increments and decrements when the buttons are clicked", () => {
  const { container } = render(<Counter />);
  const [decrement, increment] = container.querySelectorAll("button");
  const message = container.firstChild.querySelector("div");

  expect(message).toHaveTextContent("Current count: 0");
  fireEvent.click(increment);
  expect(message).toHaveTextContent("Current count: 1");
  fireEvent.click(decrement);
  expect(message).toHaveTextContent("Current count: 0");
});

test("Avoid implementation details: counter increments and decrements when the buttons are clicked", () => {
  render(<Counter />);
  const increment = screen.getByRole("button", { name: /increment/i });
  const decrement = screen.getByRole("button", { name: /decrement/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent("Current count: 0");
  fireEvent.click(increment);
  expect(message).toHaveTextContent("Current count: 1");
  fireEvent.click(decrement);
  expect(message).toHaveTextContent("Current count: 0");
});

test("use userEvent: counter increments and decrements when the buttons are clicked", async () => {
  render(<Counter />);
  const increment = screen.getByRole("button", { name: /increment/i });
  const decrement = screen.getByRole("button", { name: /decrement/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent("Current count: 0");
  await userEvent.click(increment);
  expect(message).toHaveTextContent("Current count: 1");
  await userEvent.click(decrement);
  expect(message).toHaveTextContent("Current count: 0");
});
