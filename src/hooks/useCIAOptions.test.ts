import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "./useCIAOptions";
import { CIADetails } from "../types/cia";

describe("useCIAOptions", () => {
  const validateOptionStructure = (option: CIADetails) => {
    expect(option).toHaveProperty("description");
    expect(option).toHaveProperty("impact");
    expect(option).toHaveProperty("technical");
    expect(option).toHaveProperty("capex");
    expect(option).toHaveProperty("opex");
    expect(option).toHaveProperty("bg");
    expect(option).toHaveProperty("text");
    expect(option).toHaveProperty("recommendations");
    expect(typeof option.capex).toBe("number");
    expect(typeof option.opex).toBe("number");
    expect(Array.isArray(option.recommendations)).toBe(true);
  };

  describe("Option Structures", () => {
    it("validates all availability options", () => {
      Object.values(availabilityOptions).forEach(validateOptionStructure);
    });

    it("validates all integrity options", () => {
      Object.values(integrityOptions).forEach(validateOptionStructure);
    });

    it("validates all confidentiality options", () => {
      Object.values(confidentialityOptions).forEach(validateOptionStructure);
    });
  });

  describe("Recommendations", () => {
    it("ensures all options have recommendations", () => {
      Object.values(availabilityOptions).forEach((option) => {
        // Use optional chaining to handle potentially undefined recommendations
        expect(option.recommendations?.length).toBeGreaterThan(0);
      });

      Object.values(integrityOptions).forEach((option) => {
        // Use optional chaining to handle potentially undefined recommendations
        expect(option.recommendations?.length).toBeGreaterThan(0);
      });

      Object.values(confidentialityOptions).forEach((option) => {
        // Use optional chaining to handle potentially undefined recommendations
        expect(option.recommendations?.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Option Values", () => {
    it("ensures availability options have correct levels", () => {
      expect(Object.keys(availabilityOptions)).toEqual([
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ]);
    });

    it("validates cost calculations are within bounds", () => {
      Object.values(availabilityOptions).forEach((option) => {
        expect(option.capex).toBeGreaterThanOrEqual(0);
        expect(option.capex).toBeLessThanOrEqual(100);
        expect(option.opex).toBeGreaterThanOrEqual(0);
        expect(option.opex).toBeLessThanOrEqual(100);
      });
    });

    it("ensures color values are valid hex codes", () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      Object.values(availabilityOptions).forEach((option) => {
        expect(option.bg).toMatch(hexColorRegex);
        expect(option.text).toMatch(hexColorRegex);
      });
    });
  });

  test("CIADetails type should be defined and exported", () => {
    const testDetail: CIADetails = {
      capex: 20,
      opex: 10,
      impact: "Test impact",
      technical: "Test technical",
      description: "Test description",
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Test recommendation"],
    };
    expect(testDetail).toBeDefined();
  });

  test("availabilityOptions should be defined and have correct structure", () => {
    expect(availabilityOptions).toBeDefined();
    expect(availabilityOptions.None).toHaveProperty("capex");
    expect(availabilityOptions.None).toHaveProperty("opex");
    expect(availabilityOptions.None).toHaveProperty("impact");
    expect(availabilityOptions.None).toHaveProperty("technical");
    expect(availabilityOptions.None).toHaveProperty("description");
  });

  test("integrityOptions should be defined and have correct structure", () => {
    expect(integrityOptions).toBeDefined();
    expect(integrityOptions.None).toHaveProperty("capex");
    expect(integrityOptions.None).toHaveProperty("opex");
    expect(integrityOptions.None).toHaveProperty("impact");
    expect(integrityOptions.None).toHaveProperty("technical");
    expect(integrityOptions.None).toHaveProperty("description");
  });

  test("confidentialityOptions should be defined and have correct structure", () => {
    expect(confidentialityOptions).toBeDefined();
    expect(confidentialityOptions.None).toHaveProperty("capex");
    expect(confidentialityOptions.None).toHaveProperty("opex");
    expect(confidentialityOptions.None).toHaveProperty("impact");
    expect(confidentialityOptions.None).toHaveProperty("technical");
    expect(confidentialityOptions.None).toHaveProperty("description");
  });
});
