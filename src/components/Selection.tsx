import React from "react";

interface SelectionProps {
  id: string;
  label: string;
  value: string;
  options: Record<string, any>;
  onChange: (value: string) => void;
  [x: string]: any;
}

const Selection: React.FC<SelectionProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  ...rest
}) => {
  const securityIcons: Record<string, string> = {
    None: "📋",
    Low: "ℹ️",
    Moderate: "⚠️",
    High: "🔐",
    "Very High": "🔒",
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium dark:text-gray-100 mb-1"
      >
        {label}
      </label>
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
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selection;
