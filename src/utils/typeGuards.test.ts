import {
  safeAccess,
  ensureArray,
  isValidCIADetail,
  isObject,
} from "./typeGuards";
import { CIA_TEST_IDS } from "../constants/testConstants";

describe("TypeGuard Functions", () => {
  describe("safeAccess function", () => {
    it("returns the value when object and path exist", () => {
      const obj = { a: { b: { c: "test" } } };
      expect(safeAccess(obj, "a.b.c", undefined)).toBe("test");
    });

    it("returns default value when path does not exist", () => {
      const obj = { a: { b: "test" } };
      expect(safeAccess(obj, "a.b.c", "default")).toBe("default");
    });

    it("returns default value when object is null", () => {
      expect(safeAccess(null, "a.b.c", "default")).toBe("default");
    });

    it("returns default value when object is undefined", () => {
      expect(safeAccess(undefined, "a.b.c", "default")).toBe("default");
    });

    it("handles numeric property access", () => {
      const obj = { a: [{ b: "test" }, { b: "test2" }] };
      expect(safeAccess(obj, "a.1.b", undefined)).toBe("test2");
    });

    it("handles array access with bracket notation", () => {
      const obj = { a: [{ b: "test" }, { b: "test2" }] };
      expect(safeAccess(obj, "a[1].b", undefined)).toBe("test2");
    });

    it("handles nested objects with complex paths", () => {
      const obj = {
        security: {
          levels: {
            availability: "High",
            integrity: "Moderate",
            confidentiality: "Low",
          },
        },
      };

      expect(safeAccess(obj, "security.levels.availability")).toBe("High");
      expect(safeAccess(obj, "security.levels.integrity")).toBe("Moderate");
      expect(safeAccess(obj, "security.levels.confidentiality")).toBe("Low");

      expect(safeAccess(obj, "security.levels.unknown", "Not Found")).toBe(
        "Not Found"
      );
    });

    it("handles numeric paths with different formats", () => {
      const obj = { users: [{ name: "Alice" }, { name: "Bob" }] };

      expect(safeAccess(obj, "users.0.name")).toBe("Alice");
      expect(safeAccess(obj, "users.1.name")).toBe("Bob");

      expect(safeAccess(obj, "users[0].name")).toBe("Alice");
      expect(safeAccess(obj, "users[1].name")).toBe("Bob");

      expect(safeAccess(obj, ["users", 0, "name"])).toBe("Alice");
      expect(safeAccess(obj, ["users", 1, "name"])).toBe("Bob");
    });
  });

  describe("isValidCIADetail function", () => {
    it("returns true for valid CIA detail objects", () => {
      const validDetail = {
        description: "Test description",
        impact: "High",
        technical: "Technical details",
        businessImpact: "Business impact details",
        capex: 100,
        opex: 50,
        bg: "#f0f0f0",
        text: "#000000",
        recommendations: ["Recommendation 1", "Recommendation 2"],
      };

      expect(isValidCIADetail(validDetail)).toBe(true);
    });

    it("returns false for null or undefined values", () => {
      expect(isValidCIADetail(null)).toBe(false);
      expect(isValidCIADetail(undefined)).toBe(false);
    });
  });

  describe("isObject function", () => {
    it("returns true for object values", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: "value" })).toBe(true);
      expect(isObject([])).toBe(true);
      expect(isObject(new Date())).toBe(true);
    });

    it("returns false for non-object values", () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject("string")).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(true)).toBe(false);
    });
  });

  describe("ensureArray function", () => {
    it("returns the array if input is array", () => {
      const arr = [1, 2, 3];
      expect(ensureArray(arr)).toEqual(arr);
    });

    it("wraps non-array value in array", () => {
      expect(ensureArray("test" as any)).toEqual(["test"]);
      expect(ensureArray(42 as any)).toEqual([42]);
      expect(ensureArray({ a: 1 } as any)).toEqual([{ a: 1 }]);
    });

    it("returns empty array for null", () => {
      expect(ensureArray(null)).toEqual([]);
    });

    it("returns empty array for undefined", () => {
      expect(ensureArray(undefined)).toEqual([]);
    });

    it("preserves complex nested array structures", () => {
      const nestedArray = [
        [1, 2],
        [3, 4],
      ];
      expect(ensureArray(nestedArray)).toEqual(nestedArray);

      const mixedArray = [{ a: 1 }, [1, 2], "string"];
      expect(ensureArray(mixedArray)).toEqual(mixedArray);
    });

    it("uses standard test IDs from constants", () => {
      expect(CIA_TEST_IDS.AVAILABILITY).toBe("availability");
      expect(CIA_TEST_IDS.INTEGRITY).toBe("integrity");
      expect(CIA_TEST_IDS.CONFIDENTIALITY).toBe("confidentiality");
    });
  });
});
