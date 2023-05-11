/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

//import { BrowserRouter } from "react-router-dom";

test("that jest is working", () => {
  expect(true).toBe(true);
});

test("full app rendering/navigating", async () => {
  render(<App />);
  const user = userEvent.setup();

  // verify page content for default route
  expect(screen.getByText(/Home Sweet Home/i)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await user.click(screen.getByText("Bikes"));
  expect(screen.getByText("Bike data site comes here")).toBeInTheDocument();

  // verify page content for expected route after navigating
  await user.click(screen.getByText("Sandbox"));
  expect(screen.getByText("Sandbox for testing stuff")).toBeInTheDocument();
});
