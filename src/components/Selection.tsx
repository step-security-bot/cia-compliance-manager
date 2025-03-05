import React, { useState } from "react";
import {
  COMMON_COMPONENT_TEST_IDS,
  createDynamicTestId,
  CIA_TEST_IDS,
} from "../constants/testIds";

interface SelectionProps {
  id: string;
  label: string;
  value: string;
  levels?: string[]; // Make levels optional
  options?: Record<string, any>; // Add options support
  onChange: (value: string) => void;
  className?: string;
  testId?: string;
  infoContent?: string;
  contextInfo?: string; // Add missing prop
}

/**
 * Selection component for handling dropdown selections
 * Used in CIA components for security level selection
 */
const Selection: React.FC<SelectionProps> = ({
  id,
  label,
  value,
  levels = [],
  options = {},
  onChange,
  className = "",
  testId,
  infoContent,
  contextInfo, // Add this
}) => {
  const [showInfo, setShowInfo] = useState(false);

  // If levels is empty but options isn't, extract keys from options
  const selectionLevels = levels.length > 0 ? levels : Object.keys(options);

  // Toggle info visibility
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {infoContent && (
          <button
            type="button"
            onClick={toggleInfo}
            className="ml-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            aria-label={`Show information about ${label}`}
          >
            ℹ️
          </button>
        )}
      </label>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        data-testid={testId || id} // Use id as fallback if testId is not provided
        {...(label ? { "aria-label": label } : {})} // Only add aria-label if label exists
      >
        {selectionLevels.map((level) => (
          <option
            key={level}
            value={level}
            data-testid={createDynamicTestId.option(level)}
          >
            {level}
          </option>
        ))}
      </select>

      {showInfo && infoContent && (
        <div
          className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 text-sm rounded"
          data-testid={COMMON_COMPONENT_TEST_IDS.CONTEXT_INFO}
        >
          {infoContent}
        </div>
      )}

      {/* Add contextInfo display if provided */}
      {contextInfo && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {contextInfo}
        </div>
      )}
    </div>
  );
};

export default Selection;
