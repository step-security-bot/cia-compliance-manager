import React from "react";

interface SelectionProps {
  label: string;
  options: Record<string, any>;
  value: string;
  onChange: (value: string) => void;
  id: string;
  "data-testid"?: string;
}

const Selection: React.FC<SelectionProps> = ({
  label,
  options,
  value,
  onChange,
  id,
  "data-testid": testId,
}) => (
  <div className="form-control">
    <label
      htmlFor={id}
      id={`${id}-label`}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {label}
    </label>
    <select
      id={id}
      data-testid={testId}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
      aria-label={label}
      aria-labelledby={`${id}-label`}
      aria-describedby={`${id}-description`}
    >
      {Object.entries(options).map(([key, option]) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
    <div id={`${id}-description`} className="sr-only">
      Select a {label.toLowerCase()}
    </div>
  </div>
);

export default Selection;
