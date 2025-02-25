import React, { useState } from "react";
import { CIADetails } from "../types/cia";

interface DetailCardProps {
  category: string;
  level: string;
  details: CIADetails;
}

const DetailCard: React.FC<DetailCardProps> = ({
  category,
  level,
  details,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="p-4 border border-gray-300 dark:border-gray-700 rounded-md transition-all duration-200"
      style={{ backgroundColor: details.bg }}
      role="region"
      tabIndex={0}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left flex justify-between items-center"
        aria-expanded={isExpanded}
      >
        <h3 className="font-semibold" style={{ color: details.text }}>
          {category} - {level}
          {level === "Very High" && <span className="ml-2">🔒</span>}
        </h3>
        <span
          className="transform transition-transform duration-200"
          style={{ color: details.text }}
        >
          {isExpanded ? "▼" : "▶"}
        </span>
      </button>

      <div
        className={`mt-2 transition-all duration-200 ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        <p className="mt-2">
          <span className="font-medium">📝 Description:</span>{" "}
          {details.description}
        </p>
        <p className="mt-1">
          <span className="font-medium">💥 Impact:</span> {details.impact}
        </p>
        <p className="mt-1">
          <span className="font-medium">🛡️ Technical Controls:</span>{" "}
          {details.technical}
        </p>
        {details.recommendations && (
          <div className="mt-2">
            <span className="font-medium">💡 Recommendations:</span>
            <ul className="list-disc ml-6 mt-1">
              {details.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
