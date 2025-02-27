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
    expect(option).toHaveProperty("businessImpact");
    expect(option).toHaveProperty("bg");
    expect(option).toHaveProperty("text");
    expect(option).toHaveProperty("recommendations");
    expect(typeof option.capex).toBe("number");
    expect(typeof option.opex).toBe("number");
    expect(Array.isArray(option.recommendations)).toBe(true);
  };

  describe("Option Structures", () => {
    it("validates all availability options", () => {
      Object.values(availabilityOptions).forEach((option) => {
        validateOptionStructure(option as CIADetails);
      });
    });

    it("validates all integrity options", () => {
      Object.values(integrityOptions).forEach((option) => {
        validateOptionStructure(option as CIADetails);
      });
    });

    it("validates all confidentiality options", () => {
      Object.values(confidentialityOptions).forEach((option) => {
        validateOptionStructure(option as CIADetails);
      });
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

      Object.values(integrityOptions).forEach((option) => {
        expect(option.bg).toMatch(hexColorRegex);
        expect(option.text).toMatch(hexColorRegex);
      });

      Object.values(confidentialityOptions).forEach((option) => {
        expect(option.bg).toMatch(hexColorRegex);
        expect(option.text).toMatch(hexColorRegex);
      });
    });
  });
});
