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

export const getScoreForSecurityLevels = (
  availability: string,
  integrity: string,
  confidentiality: string
): number => {
  const levelScores: Record<string, number> = {
    None: 0,
    Low: 25,
    Moderate: 50,
    High: 75,
    "Very High": 100,
  };

  return Math.round(
    (levelScores[availability] +
      levelScores[integrity] +
      levelScores[confidentiality]) /
      3
  );
};
