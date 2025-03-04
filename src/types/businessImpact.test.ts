import { BUSINESS_CONSIDERATIONS, BUSINESS_KEY_BENEFITS } from "../constants";

describe("Business Impact Types", () => {
  describe("BUSINESS_CONSIDERATIONS constant", () => {
    it("has correct structure for all CIA categories", () => {
      // Test structure for each category
      ["AVAILABILITY", "INTEGRITY", "CONFIDENTIALITY"].forEach((category) => {
        expect(BUSINESS_CONSIDERATIONS).toHaveProperty(category);

        // Test structure for each security level
        ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"].forEach((level) => {
          const categoryObj =
            BUSINESS_CONSIDERATIONS[
              category as keyof typeof BUSINESS_CONSIDERATIONS
            ];
          expect(categoryObj).toHaveProperty(level);

          // Check that each level has an array of items
          const items = categoryObj?.[level as keyof typeof categoryObj];
          expect(Array.isArray(items)).toBe(true);

          // If there are items, check their structure
          if (items && items.length > 0) {
            items.forEach((item) => {
              expect(item).toHaveProperty("type");
              expect(item).toHaveProperty("risk");
              expect(item).toHaveProperty("description");
            });
          }
        });
      });
    });
  });

  describe("BUSINESS_KEY_BENEFITS constant", () => {
    it("has entries for all security levels", () => {
      // Check that each security level has benefits
      ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"].forEach((level) => {
        expect(BUSINESS_KEY_BENEFITS).toHaveProperty(level);
        const benefits =
          BUSINESS_KEY_BENEFITS[level as keyof typeof BUSINESS_KEY_BENEFITS];
        expect(Array.isArray(benefits)).toBe(true);

        // Benefits should be non-empty strings
        if (benefits) {
          benefits.forEach((benefit) => {
            expect(typeof benefit).toBe("string");
            expect(benefit.length).toBeGreaterThan(0);
          });
        }
      });
    });
  });
});
