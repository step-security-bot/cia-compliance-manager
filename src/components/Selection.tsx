import React from "react";
import { SecurityLevelKey, UI_ICONS } from "../constants/appConstants";

interface SelectionProps {
  id: string;
  label: string;
  value: string;
  options: Record<string, any>;
  onChange: (value: string) => void;
  className?: string;
  contextInfo?: string;
  "data-testid"?: string; // Allow custom testIds
}

const Selection: React.FC<SelectionProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  className = "",
  contextInfo,
  "data-testid": testId,
}) => {
  // Add the normalized level key function
  const getNormalizedLevel = (level: string): SecurityLevelKey => {
    return (level || "NONE")
      .toUpperCase()
      .replace(/\s+/g, "_") as SecurityLevelKey;
  };

  // Get security level icon based on level
  const getSecurityLevelIcon = (level: string): string => {
    const normalizedLevel = getNormalizedLevel(level);
    // Use UI_ICONS instead of SECURITY_LEVEL_ICONS which doesn't exist
    return UI_ICONS[`SECURITY_${normalizedLevel}`] || "🔒"; // Default to a lock icon
  };

  return (
    <div className={`mb-2 ${className}`}>
      <div className="relative">
        <select
          id={id}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 dark:text-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid={testId}
          aria-label={label ? `${label} Level` : undefined} // Add aria-label only if label is provided
        >
          {Object.keys(options).map((level) => (
            <option key={level} value={level} data-testid={`option-${level}`}>
              {level}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <span className="text-gray-500">{getSecurityLevelIcon(value)}</span>
        </div>
      </div>

      {contextInfo && (
        <div
          className="text-xs text-gray-500 dark:text-gray-400 mt-1"
          data-testid="context-info"
        >
          {contextInfo}
        </div>
      )}
    </div>
  );
};

export default Selection;
