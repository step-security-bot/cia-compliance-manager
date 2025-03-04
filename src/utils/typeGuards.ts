import { CIADetails } from "../types/cia";

/**
 * Type guard to check if a CIA detail object exists
 */
export function isValidCIADetail(
  detail: CIADetails | undefined | null
): detail is CIADetails {
  return detail !== undefined && detail !== null;
}

/**
 * Type guard to check if a value is a non-null object
 */
export function isObject(
  value: unknown
): value is Record<string | number | symbol, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Safely access a nested property in an object using a dot notation path
 * @param obj The object to access
 * @param path The path to the property, e.g. 'a.b.c' or 'a[0].b.c'
 * @param defaultValue The default value to return if the property doesn't exist
 * @returns The value at the path or the default value
 */
export function safeAccess<T = any>(
  obj: any,
  path: string | (string | number)[],
  defaultValue?: T
): T {
  if (obj == null) {
    return defaultValue as T;
  }

  const parts = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current = obj;

  for (const part of parts) {
    if (current == null) {
      return defaultValue as T;
    }

    if (typeof current !== "object") {
      return defaultValue as T;
    }

    current = current[part];
  }

  return current !== undefined ? current : (defaultValue as T);
}

/**
 * Ensures the value is an array. If it's already an array, returns it.
 * If it's null or undefined, returns an empty array. Otherwise wraps it in an array.
 * @param value The value to ensure is an array
 * @returns An array
 */
export function ensureArray<T>(value: T[] | T | null | undefined): T[] {
  if (value === null || value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value as T];
}
