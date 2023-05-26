/**
 * @jest-environment jsdom
 * @jest-setup jest-setup.ts
 */

//import { expect, test } from "@jest/globals";
//import {expect} from '@testing-library/jest-dom'
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
  await user.click(screen.getByText("Bike Stations"));
  expect(screen.getByText("Search:")).toBeInTheDocument();

  // verify page content for expected route after navigating
  await user.click(screen.getByText("Upload CSVs"));
  expect(
    screen.getByText("Drop bike station or bike trip CSV files here")
  ).toBeInTheDocument();
});
