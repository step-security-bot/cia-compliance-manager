import { CIADetails } from "./cia";

describe("CIADetails Type", () => {
  it("should be correctly structured", () => {
    // Create an object that conforms to the CIADetails interface
    const details: CIADetails = {
      description: "Test Description",
      impact: "Test Impact",
      technical: "Test Technical Controls",
      capex: 50,
      opex: 30,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Recommendation 1", "Recommendation 2"],
    };

    // Verify the structure
    expect(details).toHaveProperty("description");
    expect(details).toHaveProperty("impact");
    expect(details).toHaveProperty("technical");
    expect(details).toHaveProperty("capex");
    expect(details).toHaveProperty("opex");
    expect(details).toHaveProperty("bg");
    expect(details).toHaveProperty("text");
    expect(details).toHaveProperty("recommendations");

    // Verify the types
    expect(typeof details.description).toBe("string");
    expect(typeof details.impact).toBe("string");
    expect(typeof details.technical).toBe("string");
    expect(typeof details.capex).toBe("number");
    expect(typeof details.opex).toBe("number");
    expect(typeof details.bg).toBe("string");
    expect(typeof details.text).toBe("string");
    expect(Array.isArray(details.recommendations)).toBe(true);
  });

  it("should allow optional fields", () => {
    // Create minimal object that conforms to CIADetails
    const minimalDetails: CIADetails = {
      description: "Test",
      impact: "Test",
      technical: "Test",
      capex: 0,
      opex: 0,
      bg: "#000",
      text: "#fff",
      // recommendations is optional in some cases
    };

    expect(minimalDetails).toBeDefined();
  });

  it("supports all expected CIA levels", () => {
    const levels = ["None", "Low", "Moderate", "High", "Very High"];

    // Create a record type with CIA levels
    type TestRecord = Record<string, CIADetails>;

    const testRecord: TestRecord = {};

    levels.forEach((level) => {
      testRecord[level] = {
        description: `${level} description`,
        impact: `${level} impact`,
        technical: `${level} technical`,
        capex: 20,
        opex: 10,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [`${level} recommendation`],
      };
    });

    // Check record has all expected levels
    expect(Object.keys(testRecord).sort()).toEqual(levels.sort());

    // Each entry should conform to CIADetails
    Object.values(testRecord).forEach((details) => {
      expect(details).toHaveProperty("description");
      expect(details).toHaveProperty("impact");
      expect(details).toHaveProperty("technical");
      expect(details).toHaveProperty("capex");
      expect(details).toHaveProperty("opex");
      expect(details).toHaveProperty("bg");
      expect(details).toHaveProperty("text");
      expect(details).toHaveProperty("recommendations");
    });
  });

  it("handles recommendations array properly", () => {
    // Test with empty recommendations
    const emptyRecDetails: CIADetails = {
      description: "Test",
      impact: "Test",
      technical: "Test",
      capex: 10,
      opex: 5,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [],
    };
    expect(emptyRecDetails.recommendations).toEqual([]);

    // Test with multiple recommendations
    const multiRecDetails: CIADetails = {
      description: "Test",
      impact: "Test",
      technical: "Test",
      capex: 10,
      opex: 5,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [
        "Recommendation 1",
        "Recommendation 2",
        "Recommendation 3",
      ],
    };
    expect(multiRecDetails.recommendations?.length).toBe(3); // Add optional chaining
  });
});
