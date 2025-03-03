import { render } from "@testing-library/react";
import { ReactElement } from "react";

/**
 * Custom render function for unit tests
 */
export function renderWithProviders(ui: ReactElement, options = {}) {
  return render(ui, {
    ...options,
  });
}

/**
 * Helper to select an element by text content
 */
export function getElementByText(
  text: string,
  container: HTMLElement
): HTMLElement | null {
  const elements = container.querySelectorAll("*");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement;
    if (element && element.textContent === text) {
      return element;
    }
  }
  return null;
}

/**
 * Helper to get a mock normalized security level
 */
export function getNormalizedLevel(level: string): string {
  return level.toUpperCase().replace(/\s+/g, "_");
}

/**
 * Helper for generating test data
 */
export function generateTestOptions(
  levels: string[] = ["None", "Low", "Moderate", "High", "Very High"]
): Record<string, any> {
  const options: Record<string, any> = {};

  levels.forEach((level, index) => {
    const percent = index * 20;
    options[level] = {
      description: `${level} level description`,
      technical: `${level} technical details`,
      businessImpact: `${level} business impact`,
      capex: index * 10,
      opex: index * 5,
      uptime: level === "None" ? "N/A" : `${99 - (5 - index)}%`,
      validationMethod: level === "None" ? "None" : `${level} validation`,
      protectionMethod: level === "None" ? "None" : `${level} protection`,
    };
  });

  return options;
}

// Helper functions to make test selectors more reliable
export const getTestSelector = (selector: string): string => {
  return `[data-testid="${selector}"]`;
};

export const getAnalysisForCategory = (
  category: string,
  level: string
): string => {
  return `[data-category="${category}"][data-level="${level}"]`;
};

export const getDetailContent = (selector: string): string => {
  return `${selector} [data-testid="detail-content"]`;
};

export const waitForElementTransition = (
  element: HTMLElement
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const transitionEnd = () => {
      element.removeEventListener("transitionend", transitionEnd);
      resolve();
    };
    element.addEventListener("transitionend", transitionEnd);

    // Backup timeout in case transition doesn't fire
    setTimeout(resolve, 1000);
  });
};

// Define the levelScores variable
const levelScores: Record<string, number> = {
  None: 0,
  Low: 25,
  Moderate: 50,
  High: 75,
  "Very High": 100,
};

export const getScoreForSecurityLevels = (
  availability: string,
  integrity: string,
  confidentiality: string
): number => {
  // Create safe accessor for the scores
  const getScore = (level: string): number => {
    return levelScores[level] || 0; // Default to 0 for unknown levels
  };

  return Math.round(
    (getScore(availability) + getScore(integrity) + getScore(confidentiality)) /
      3
  );
};

// Get average security score
export const getAverageSecurityScore = (
  availability: string,
  integrity: string,
  confidentiality: string
): number => {
  // Create a safe version of levelScores with defaults
  const scores = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  return (
    (scores[availability as keyof typeof scores] +
      scores[integrity as keyof typeof scores] +
      scores[confidentiality as keyof typeof scores]) /
    3
  );
};
