import React from "react";

interface DetailCardProps {
  category: string;
  level: string;
  details: {
    capex: number;
    opex: number;
    impact: string;
    technical: string;
    description: string;
  };
}

const levelColors: Record<string, { bg: string; text: string }> = {
  None: { bg: "#e5e7eb", text: "#374151" },
  Basic: { bg: "#d1fae5", text: "#065f46" },
  Moderate: { bg: "#fef3c7", text: "#92400e" },
  High: { bg: "#ffedd5", text: "#c2410c" },
  "Very High": { bg: "#fee2e2", text: "#991b1b" },
};

const DetailCard: React.FC<DetailCardProps> = ({ category, level, details }) => (
  <div
    className="p-4 border border-gray-300 dark:border-gray-700 rounded-md"
    style={{ backgroundColor: levelColors[level].bg }}
  >
    <h3 className="font-semibold" style={{ color: levelColors[level].text }}>
      {category} - {level}
    </h3>
    <p className="text-sm text-gray-700 dark:text-gray-200">
      CAPEX: {details.capex}% | OPEX: {details.opex}%
    </p>
    <p className="mt-1" style={{ color: levelColors[level].text }}>
      Impact: {details.impact}
    </p>
    <p className="mt-1 text-gray-600 dark:text-gray-400">
      Technical: {details.technical}
    </p>
  </div>
);

export default DetailCard;
