import React from "react";
import { CIADetails } from "../hooks/useCIAOptions";

interface DetailCardProps {
  category: string;
  level: string;
  details: CIADetails;
}

const DetailCard: React.FC<DetailCardProps> = ({
  category,
  level,
  details,
}) => (
  <div
    className="p-4 border border-gray-300 dark:border-gray-700 rounded-md"
    style={{ backgroundColor: details.bg }}
    role="region"
    tabIndex={0}
  >
    <h3 className="font-semibold" style={{ color: details.text }}>
      {category} - {level}
    </h3>
    <p className="mt-2">Description: {details.description}</p>
    <p className="mt-1">Impact: {details.impact}</p>
    <p className="mt-1">Technical Controls: {details.technical}</p>
  </div>
);

export default DetailCard;
