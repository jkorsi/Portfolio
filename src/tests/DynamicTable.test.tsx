import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { DynamicTable } from "../components/DynamicTable";
import mockStations from "./mockStations.json";

const server = setupServer(
  rest.get("http://localhost/api/stations", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStations));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders dynamic table with correct headings and content", async () => {
  render(
    <DynamicTable
      fetchUrl="http://localhost/api/stations"
      columnFilter={["fid", "stationLocationX", "stationLocationY"]}
    />
  );

  // Wait for the data to be fetched and the table to render
  await waitFor(() => {
    const elements = screen.queryAllByText(/Keilalahti/i);

    // Assert the rendered headings
    expect(screen.getByText(/Id/i)).toBeInTheDocument();
    expect(screen.getByText(/Station Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Station Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Station City/i)).toBeInTheDocument();
    expect(screen.getByText(/Station Capacity/i)).toBeInTheDocument();

    // Assert the rendered content
    expect(screen.getByText(/Keilalahti/i)).toBeInTheDocument();
    expect(screen.getByText(/Westendinasema/i)).toBeInTheDocument();
    expect(screen.getByText(/Westendintie 1/i)).toBeInTheDocument();

    // Filtered stations should not be rendered
    expect(screen.queryByText(/Station Location/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fid/i)).not.toBeInTheDocument();
    return elements.length > 0;
  });

  console.log(screen.debug);
});
