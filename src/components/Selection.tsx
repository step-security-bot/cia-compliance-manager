import React from "react";
import ValueDisplay from "./common/ValueDisplay";

interface SelectionProps {
  id?: string;
  label: string;
  value: string;
  options: Record<string, any>;
  onChange: (value: string) => void;
  contextInfo?: string;
  "data-testid"?: string;
}

const Selection: React.FC<SelectionProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  contextInfo,
  "data-testid": testId,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  // Get appropriate variant based on current value
  const getValueVariant = (
    level: string
  ): "success" | "warning" | "danger" | "info" | "primary" => {
    switch (level.toUpperCase()) {
      case "NONE":
        return "danger";
      case "LOW":
        return "warning";
      case "MODERATE":
        return "info";
      case "HIGH":
        return "success";
      case "VERY HIGH":
        return "primary";
      default:
        return "info";
    }
  };

  return (
    <div className="mb-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={handleChange}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 dark:text-white"
          data-testid={testId}
        >
          {Object.keys(options).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {contextInfo && (
        <div className="mt-1 flex justify-end">
          <ValueDisplay
            value={contextInfo}
            variant={getValueVariant(value)}
            size="sm"
            testId={`${testId}-context-info`}
          />
        </div>
      )}
    </div>
  );
};

export default Selection;
