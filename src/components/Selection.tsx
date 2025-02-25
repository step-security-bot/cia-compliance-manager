import React from "react";

interface SelectionProps {
  label: string;
  options: Record<string, any>;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

const Selection: React.FC<SelectionProps> = ({ label, options, value, onChange, id }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-2 font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 dark:border-gray-700 rounded-md"
    >
      {Object.keys(options).map((level) => (
        <option
          key={level}
          value={level}
          style={{
            backgroundColor: options[level].bg,
            color: options[level].text,
          }}
        >
          {level} - {options[level].description}
        </option>
      ))}
    </select>
    <p className="mt-2 text-sm" style={{ color: options[value].text }}>
      Impact: {options[value].impact}
    </p>
  </div>
);

export default Selection;
