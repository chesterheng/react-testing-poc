import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { build, fake } from "@jackfranklin/test-data-bot";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { LoginSubmission } from "./LoginSubmission";
import { handlers } from "../test/server-handlers";

const buildLoginForm = build({
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
});

// mocking HTTP requests
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

test(`reuse server request handlers: logging in displays the user's username`, async () => {
  render(<LoginSubmission />);
  const { username, password } = buildLoginForm();

  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});

test("test the unhappy path: omitting the password results in an error", async () => {
  render(<LoginSubmission />);
  const { username } = buildLoginForm();

  await userEvent.type(screen.getByLabelText(/username/i), username);
  // don't type in the password
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert")).toHaveTextContent("password required");

});

test("use inline snapshots for error messages: omitting the password results in an error", async () => {
  render(<LoginSubmission />);
  const { username } = buildLoginForm();

  await userEvent.type(screen.getByLabelText(/username/i), username);
  // don't type in the password
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
    `"password required"`
  );
});

test("unknown server error displays the error message", async () => {
  // use one-off server handlers
  const testErrorMessage = "Oh no, something bad happened";
  server.use(
    rest.post(
      "https://auth-provider.example.com/api/login",
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
      }
    )
  );
  render(<LoginSubmission />);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert")).toHaveTextContent(testErrorMessage);
});
