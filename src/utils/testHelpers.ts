// Add helper functions to make test selectors more reliable

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

// Define the missing levelScores variable
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

// Fix potentially undefined levelScores
const getAverageSecurityScore = (
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
