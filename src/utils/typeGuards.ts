import { CIADetails } from "../types/cia";

/**
 * Type guard to check if a CIA detail object exists
 */
export function isValidCIADetail(
  detail: CIADetails | undefined
): detail is CIADetails {
  return detail !== undefined && detail !== null;
}

/**
 * Type guard to check if a value is a non-null object
 */
function isObject(
  value: unknown
): value is Record<string | number | symbol, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Safe accessor for possibly undefined objects
 * @param obj The object to access safely
 * @param property The property to access
 * @param defaultValue Default value if object or property is undefined
 */
export function safeAccess<T extends object, K extends keyof T>(
  obj: T | undefined | null,
  property: K,
  defaultValue: T[K]
): T[K] {
  if (!isObject(obj)) {
    return defaultValue;
  }

  return property in obj ? obj[property] : defaultValue;
}

/**
 * Ensures an array exists, returning empty array if undefined
 */
export function ensureArray<T>(arr: T[] | undefined | null): T[] {
  return arr || [];
}
