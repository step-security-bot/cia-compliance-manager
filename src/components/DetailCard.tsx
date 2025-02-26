import React, { useState } from "react";
import { CIADetails } from "../types/cia";

interface DetailCardProps {
  category: string;
  level: string;
  details: CIADetails;
}

// Helper function to get icon for security level
const getLevelIcon = (level: string): string => {
  switch (level) {
    case "Very High":
      return "🔒"; // Locked
    case "High":
      return "🔐"; // Lock with key
    case "Moderate":
      return "⚠️"; // Warning
    case "Low":
      return "ℹ️"; // Info
    default:
      return "";
  }
};

const DetailCard: React.FC<DetailCardProps> = ({
  category,
  level,
  details,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const { description, impact, technical, bg, text, recommendations } = details;
  const icon = getLevelIcon(level);

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg border-gray-200 dark:border-gray-700 `}
      style={{
        borderColor: bg ? bg.replace("ffffff", "000000") + "1A" : undefined,
      }}
      role="region"
      tabIndex={0}
    >
      <button
        onClick={toggleExpanded}
        className="w-full text-left flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 transition-all duration-300 bg-opacity-70"
        aria-expanded={expanded}
        data-testid="toggle-button"
      >
        <h3
          className="font-semibold text-lg flex items-center"
          data-testid="main-heading"
        >
          <span className="flex items-center justify-center mr-2 w-6 h-6 transition-transform duration-300 transform">
            <span className="inline-block w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded-full"></span>
          </span>
          <span className="font-medium">{category}</span>
          <span className="mx-1">-</span>
          <span className="font-bold">
            {icon} {level}
          </span>
          <span className="ml-2 text-xs opacity-70">(Click to expand)</span>
        </h3>
        <span
          className={`transform transition-transform duration-300 ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
      </button>
      <div
        className={`${
          expanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? "" : "hidden"
        }`}
        data-testid="detail-content"
      >
        <div className="bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-90 p-5 m-2 rounded-md shadow-sm">
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Description
            </h4>
            <p className="text-gray-800 dark:text-gray-200">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 flex items-center">
                <span className="mr-1 text-xs">💥</span> Impact
              </h4>
              <p className="text-gray-800 dark:text-gray-200">{impact}</p>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 flex items-center">
                <span className="mr-1 text-xs">🛡️</span> Technical Controls
              </h4>
              <p className="text-gray-800 dark:text-gray-200">{technical}</p>
            </div>
          </div>

          {recommendations && recommendations.length > 0 && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 flex items-center">
                <span className="mr-1 text-xs">💡</span> Recommendations
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={toggleExpanded}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            data-testid="close-button"
          >
            <span className="mr-1">Close</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
