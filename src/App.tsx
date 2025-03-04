import React from "react";
import CIAClassificationApp from "./CIAClassificationApp";

/**
 * Main App component
 * Acts as a simple wrapper around CIAClassificationApp to maintain backward compatibility
 */
export const App: React.FC = () => {
  return (
    <div className="app-root" data-testid="app-root">
      {/* Add the cia-classification-app testId to fix the failing test */}
      <div data-testid="cia-classification-app">
        <CIAClassificationApp />
      </div>
    </div>
  );
};

export default App;
