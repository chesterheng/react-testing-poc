import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import faker from "faker";
import { build, fake } from "@jackfranklin/test-data-bot";
import { Login } from "./Login";

test("submitting the form calls onSubmit with username and password", async () => {
  let submittedData;
  const handleSubmit = (data) => (submittedData = data);
  render(<Login onSubmit={handleSubmit} />);
  const username = "chucknorris";
  const password = "i need no password";

  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(submittedData).toEqual({
    username,
    password,
  });
});

test("use a jest mock function: submitting the form calls onSubmit with username and password", async () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  const username = "chucknorris";
  const password = "i need no password";

  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

// use Test Data Bot
const buildLoginForm = build({
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
});

// allow for overrides
// const buildLoginForm = (overrides) => {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     ...overrides,
//   };
// };

test("generate test data: submitting the form calls onSubmit with username and password", async () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  const { username, password } = buildLoginForm();

  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
