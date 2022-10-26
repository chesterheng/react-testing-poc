import React from "react";
import { render, renderHook, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCounter } from "../hooks/useCounter";
import { UseCounterHookExample } from "../components/UseCounterHookExample";

test("exposes the count and increment/decrement functions", async () => {
  render(<UseCounterHookExample />);
  const increment = screen.getByRole("button", { name: /increment/i });
  const decrement = screen.getByRole("button", { name: /decrement/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent("Current count: 0");
  await userEvent.click(increment);
  expect(message).toHaveTextContent("Current count: 1");
  await userEvent.click(decrement);
  expect(message).toHaveTextContent("Current count: 0");
});

test("fake component: exposes the count and increment/decrement functions", () => {
  let result;
  const TestComponent = () => {
    result = useCounter();
    return null;
  };
  render(<TestComponent />);
  expect(result.count).toBe(0);
  act(() => result.increment());
  expect(result.count).toBe(1);
  act(() => result.decrement());
  expect(result.count).toBe(0);
});

// setup function
const setup = ({ initialProps } = {}) => {
  const result = {};
  const TestComponent = () => {
    result.current = useCounter(initialProps);
    return null;
  };
  render(<TestComponent />);
  return result;
};

test("exposes the count and increment/decrement functions", () => {
  const result = setup();
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of the initial count", () => {
  const result = setup({ initialProps: { initialCount: 3 } });
  expect(result.current.count).toBe(3);
});

test("allows customization of the step", () => {
  const result = setup({ initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("using react-hooks testing library: exposes the count and increment/decrement functions", () => {
  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of the initial count", () => {
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 3 },
  });
  expect(result.current.count).toBe(3);
});

test("allows customization of the step", () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("the step can be changed", () => {
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: 3 },
  });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(3);
  rerender({ step: 2 });
  act(() => result.current.decrement());
  expect(result.current.count).toBe(1);
});
