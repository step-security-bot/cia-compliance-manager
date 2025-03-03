import React, { ReactNode } from "react";
import { WIDGET_ICONS } from "../constants/appConstants";

interface WrapWidgetOptions {
  title: string;
  icon?: ReactNode;
  testId?: string;
  size?: "small" | "medium" | "large" | "full";
}

/**
 * Utility to wrap content in a standardized widget container
 * Can be used to quickly add proper widget styling to any content
 */
export const wrapInWidgetContainer = (
  content: ReactNode,
  options: WrapWidgetOptions
) => {
  const { title, icon, testId, size = "medium" } = options;

  // Map size to grid columns
  const sizeClasses = {
    small: "widget-col-2",
    medium: "widget-col-4",
    large: "widget-col-6",
    full: "widget-col-12",
  };

  return (
    <div
      className={`widget ${sizeClasses[size]} bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-md`}
      data-testid={
        testId || `widget-${title.toLowerCase().replace(/\s+/g, "-")}`
      }
    >
      <div className="widget-header p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-t-lg">
        <h3 className="text-md font-semibold flex items-center">
          {icon && <span className="mr-2 widget-icon">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="widget-body p-3 overflow-hidden">{content}</div>
    </div>
  );
};

/**
 * Utility function to add widget styling to an existing DOM element
 * This can be used in useEffect to convert existing elements to widgets
 */
export const applyWidgetStyling = () => {
  // Target elements that should be widgets but might not have the class
  const potentialWidgets = document.querySelectorAll(
    '[data-testid^="widget-"], [data-testid="radar-widget-container"]'
  );

  potentialWidgets.forEach((widget) => {
    // Add the widget class if it doesn't exist
    if (!widget.classList.contains("widget")) {
      widget.classList.add("widget");
    }

    // Look for header and body elements
    let header = widget.querySelector('[class*="header"]');
    let body = widget.querySelector('[class*="body"]');

    // If no header is found, look for the first heading
    if (!header) {
      header = widget.querySelector("h3, h4");
      if (
        header &&
        header.parentElement &&
        !header.parentElement.classList.contains("widget-header")
      ) {
        // Wrap the header in a proper widget-header div
        const headerWrapper = document.createElement("div");
        headerWrapper.className =
          "widget-header p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-t-lg";

        // Check for null parentNode before DOM manipulation
        if (header.parentNode) {
          header.parentNode.insertBefore(headerWrapper, header);
          headerWrapper.appendChild(header);
        }
      }
    }

    // If header exists but doesn't have the widget-header class
    if (
      header &&
      header.parentElement &&
      !header.classList.contains("widget-header")
    ) {
      header.classList.add("widget-header");
    }

    // If no body is found, wrap all content after the header
    if (!body) {
      // Find all content after the header
      const headerElement = widget.querySelector(".widget-header");
      if (headerElement) {
        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "widget-body p-3 overflow-hidden";

        // Move all elements after the header into the body wrapper
        let nextSibling = headerElement.nextSibling;
        while (nextSibling) {
          const current = nextSibling;
          nextSibling = nextSibling.nextSibling;
          bodyWrapper.appendChild(current);
        }

        widget.appendChild(bodyWrapper);
      }
    }

    // If body exists but doesn't have the widget-body class
    if (body && !body.classList.contains("widget-body")) {
      body.classList.add("widget-body");
    }
  });
};
