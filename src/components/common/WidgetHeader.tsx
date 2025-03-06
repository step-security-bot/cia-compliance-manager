import React, { ReactNode } from "react";
import { WIDGET_ICONS } from "../../constants/appConstants";

interface WidgetHeaderProps {
  title: string;
  iconKey?: keyof typeof WIDGET_ICONS | string;
  actions?: ReactNode;
  className?: string;
  testId?: string;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  iconKey,
  actions,
  className = "",
  testId,
}) => {
  // Determine the icon to display
  let iconToDisplay = "";
  if (iconKey) {
    // If iconKey is a key in WIDGET_ICONS, use the corresponding value
    if (iconKey in WIDGET_ICONS) {
      iconToDisplay = WIDGET_ICONS[iconKey as keyof typeof WIDGET_ICONS];
    } else {
      // Otherwise, assume iconKey is already an emoji string
      iconToDisplay = iconKey;
    }
  }

  return (
    <div
      className={`flex items-center justify-between pb-2 mb-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
      data-testid={testId}
    >
      <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
        {iconToDisplay && (
          <span className="mr-2" aria-hidden="true">
            {iconToDisplay}
          </span>
        )}
        {title}
      </h3>
      {actions && <div className="flex items-center space-x-2">{actions}</div>}
    </div>
  );
};

export default WidgetHeader;
