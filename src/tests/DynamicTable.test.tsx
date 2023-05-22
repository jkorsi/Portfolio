/**
 * @jest-environment jsdom
 * @jest-setup jest-setup.ts
 */

import { render, screen } from "@testing-library/react";
import { DynamicTable } from "../components/DynamicTable";

const mockData: string[] = [
  JSON.stringify({
    fid: 1,
    id: 501,
    stationName: "Hanasaari",
    stationAddress: "Hanasaarenranta 1",
    stationCity: "Espoo",
    stationCapacity: 10,
    stationLocationX: 24.840319,
    stationLocationY: 60.16582,
  }),
  JSON.stringify({
    fid: 2,
    id: 503,
    stationName: "Keilalahti",
    stationAddress: "Keilalahdentie 2",
    stationCity: "Espoo",
    stationCapacity: 28,
    stationLocationX: 24.827467,
    stationLocationY: 60.171524,
  }),
  JSON.stringify({
    fid: 3,
    id: 505,
    stationName: "Westendinasema",
    stationAddress: "Westendintie 1",
    stationCity: "Espoo",
    stationCapacity: 16,
    stationLocationX: 24.805758,
    stationLocationY: 60.168266,
  }),
  JSON.stringify({
    fid: 456,
    id: 404,
    stationName: "Sompasaari",
    stationAddress: "Sompasaarenlaituri 2",
    stationCity: " ",
    stationCapacity: 14,
    stationLocationX: 24.976076,
    stationLocationY: 60.18293,
  }),
  JSON.stringify({
    fid: 457,
    id: 405,
    stationName: "Jollas",
    stationAddress: "Jollaksentie 33",
    stationCity: " ",
    stationCapacity: 16,
    stationLocationX: 25.061668,
    stationLocationY: 60.164406,
  }),
];

const parsedMockData = mockData.map((data) => JSON.parse(data));

test("renders dynamic table with correct headings and content", () => {
  render(
    <DynamicTable
      headings={Object.keys(JSON.parse(mockData[0]))}
      content={parsedMockData}
      columnFilter={["fid", "stationLocationX", "stationLocationY"]}
    />
  );

  // Assert the rendered headings
  expect(screen.getByText(/Id/i)).toBeInTheDocument();

  expect(screen.getByText(/Station Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Station Address/i)).toBeInTheDocument();
  expect(screen.getByText(/Station City/i)).toBeInTheDocument();
  expect(screen.getByText(/Station Capacity/i)).toBeInTheDocument();
  expect(screen.queryByText(/Station Location/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Fid/i)).not.toBeInTheDocument();

  // Assert the rendered content
  expect(screen.getByText(/Hanasaari/i)).toBeInTheDocument();
  expect(screen.getByText(/Sompasaari/i)).toBeInTheDocument();
  expect(screen.getByText(/Sompasaarenlaituri 2/i)).toBeInTheDocument();
});
