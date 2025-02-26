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

  return (
    <div
      className="border border-gray-300 dark:border-gray-700 rounded-md transition-all duration-200"
      style={{ backgroundColor: bg }}
      role="region"
      tabIndex={0}
    >
      <button
        onClick={toggleExpanded}
        className="w-full text-left flex justify-between items-center p-4"
        aria-expanded={expanded}
      >
        <h3
          className="font-semibold text-lg flex items-center"
          style={{ color: text }}
        >
          {category} - {level} {getLevelIcon(level)}
        </h3>
        <span
          className={`transform transition-transform duration-200 ${
            expanded ? "rotate-90" : ""
          }`}
          style={{ color: text }}
        >
          ▶
        </span>
      </button>
      <div
        className={`px-4 pb-4 mt-0 transition-all duration-200 ${
          expanded ? "block" : "hidden"
        }`}
        data-testid="detail-content"
      >
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-4 rounded-md transition-colors duration-300">
          <p className="mt-2">
            <span className="font-medium">📝 Description:</span> {description}
          </p>
          <p className="mt-1">
            <span className="font-medium">💥 Impact:</span> {impact}
          </p>
          <p className="mt-1">
            <span className="font-medium">🛡️ Technical Controls:</span>{" "}
            {technical}
          </p>

          {recommendations && recommendations.length > 0 && (
            <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
              <p className="font-medium mb-2">💡 Recommendations:</p>
              <ul className="list-disc pl-5 space-y-1">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-800 dark:text-gray-200">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
