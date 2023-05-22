import { CamelCaseToNormal } from "../tools/CamelCaseToNormal";

test("converts camel case to normal case", () => {
  // Test cases with different input keys
  const testCases = [
    { input: "firstName", expected: "First Name" },
    { input: "lastName", expected: "Last Name" },
    { input: "emailAddress", expected: "Email Address" },
    { input: "phoneNumber", expected: "Phone Number" },
    { input: "addressLine1", expected: "Address Line 1" },
  ];

  // Iterate over each test case
  testCases.forEach(({ input, expected }) => {
    const result = CamelCaseToNormal(input);

    // Assert the converted value matches the expected result
    expect(result).toEqual(expected);
  });
});

describe("CamelCaseToNormal", () => {
  it("should separate letters from numbers", () => {
    expect(CamelCaseToNormal("Xyz1Abc")).toBe("Xyz 1 Abc");
    expect(CamelCaseToNormal("Abc123Def456")).toBe("Abc 123 Def 456");
  });

  it("should handle input with no letters or numbers", () => {
    expect(CamelCaseToNormal("HelloWorld")).toBe("Hello World");
  });

  it("should handle input with only numbers", () => {
    expect(CamelCaseToNormal("123456")).toBe("123456");
  });

  it("should handle input with only a single letter", () => {
    expect(CamelCaseToNormal("X")).toBe("X");
  });

  it("should handle empty string", () => {
    expect(CamelCaseToNormal("")).toBe("");
  });
});
