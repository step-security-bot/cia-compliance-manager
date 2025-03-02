import React from "react";
import { SECURITY_LEVELS } from "../constants/appConstants";

interface SelectionProps {
  id: string;
  label: string;
  value: string;
  options: Record<string, any>;
  onChange: (value: string) => void;
  contextInfo?: string;
  [x: string]: any;
}

const Selection: React.FC<SelectionProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  contextInfo,
  ...rest
}) => {
  // Use constants for security level icons mapping
  const securityIcons: Record<string, string> = {
    [SECURITY_LEVELS.NONE]: "📋",
    [SECURITY_LEVELS.LOW]: "ℹ️",
    [SECURITY_LEVELS.MODERATE]: "⚠️",
    [SECURITY_LEVELS.HIGH]: "🔐",
    [SECURITY_LEVELS.VERY_HIGH]: "🔒",
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium dark:text-gray-100 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm
                  focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400
                  dark:focus:border-blue-400 dark:text-white dark:bg-gray-800
                  dark:border-gray-600"
          aria-label={label}
          {...rest}
        >
          {Object.keys(options).map((key) => (
            <option key={key} value={key}>
              {key in securityIcons ? `${securityIcons[key]} ` : ""}
              {key}
              {/* We could add contextual info here but it would clutter dropdown display */}
            </option>
          ))}
        </select>

        {/* Display context info below select if provided */}
        {contextInfo && (
          <div className="mt-1.5 text-xs text-gray-600 dark:text-gray-400">
            {contextInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default Selection;
