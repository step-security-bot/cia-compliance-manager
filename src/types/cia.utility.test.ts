/**
 * This test helps ensure TypeScript types are correctly defined
 * by using them in a way that would cause TypeScript compilation errors
 * if they were incorrect.
 */
import { CIADetails } from "./cia";

describe("CIADetails TypeScript Type Validation", () => {
  it("validates all fields of CIADetails with TypeScript", () => {
    // TypeScript helper function that would throw compilation errors
    // if the types are not correct.
    const validateCIADetailsType = (details: CIADetails): void => {
      // String fields
      details.description.toLowerCase();
      details.impact.toLowerCase();
      details.technical.toLowerCase();
      details.businessImpact.toLowerCase(); // Added businessImpact validation
      details.bg.startsWith("#");
      details.text.startsWith("#");

      // Number fields
      details.capex.toFixed(2);
      details.opex.toFixed(2);

      // Array field (might be undefined)
      details.recommendations?.forEach((rec) => {
        rec.toLowerCase();
      });
    };

    // Create valid object to pass to our validation function
    const testDetails: CIADetails = {
      description: "Description",
      impact: "Impact description",
      technical: "Technical details",
      businessImpact: "Business impact details",
      capex: 25,
      opex: 15,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Rec 1", "Rec 2"],
    };

    // Won't actually do anything at runtime, but helps TypeScript validation
    validateCIADetailsType(testDetails);

    // Create minimal object
    const minimalDetails: CIADetails = {
      description: "Min",
      impact: "Min",
      technical: "Min",
      businessImpact: "Min",
      capex: 0,
      opex: 0,
      bg: "#fff",
      text: "#000",
      recommendations: [], // Add this as it's required, not optional
    };

    validateCIADetailsType(minimalDetails);

    // Basic test to satisfy Jest
    expect(true).toBeTruthy();
  });
});
