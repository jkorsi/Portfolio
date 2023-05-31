import { render, screen } from "@testing-library/react";
import CSVImporter, {
  isValidStationCSV,
  isValidBikeTripCSV,
} from "../routing/pages/CSVImporter";

describe("CSVImporter", () => {
  test("renders properly", () => {
    render(<CSVImporter />);
    const stationTitleElement = screen.getByText(/Stations File Selection/i);
    const bikeTripTitleElement = screen.getByText(/Bike Trips File Selection/i);

    expect(stationTitleElement).toBeInTheDocument();
    expect(bikeTripTitleElement).toBeInTheDocument();
  });

  test("isValidStationCSV validates header properly", () => {
    const validHeader = [
      "FID",
      "ID",
      "Nimi",
      "Namn",
      "Name",
      "Osoite",
      "Adress",
      "Kaupunki",
      "Stad",
      "Operaattor",
      "Kapasiteet",
      "x",
      "y",
    ];
    const invalidHeader = ["FID", "ID", "Nimi", "x", "y"];
    const data = [
      [
        "FID1",
        "ID1",
        "Nimi1",
        "Namn1",
        "Name1",
        "Osoite1",
        "Adress1",
        "Kaupunki1",
        "Stad1",
        "Operaattor1",
        "Kapasiteet1",
        "x1",
        "y1",
      ],
    ];

    expect(isValidStationCSV(data, validHeader)).toBe(true);
    expect(isValidStationCSV(data, invalidHeader)).toBe(false);
  });

  test("isValidBikeTripCSV validates header properly", () => {
    const validHeader = [
      "Departure",
      "Return",
      "Departure station id",
      "Departure station name",
      "Return station id",
      "Return station name",
      "Covered distance (m)",
      "Duration (sec.)",
    ];
    const invalidHeader = [
      "Departure",
      "Return",
      "Departure station id",
      "x",
      "y",
    ];
    const data = [
      [
        "Departure1",
        "Return1",
        "Departure station id1",
        "Departure station name1",
        "Return station id1",
        "Return station name1",
        "Covered distance (m)1",
        "Duration (sec.)1",
      ],
    ];

    expect(isValidBikeTripCSV(data, validHeader)).toBe(true);
    expect(isValidBikeTripCSV(data, invalidHeader)).toBe(false);
  });
});
