import React, { useEffect } from "react";
import { applyWidgetStyling } from "../../utils/widgetUtils";

/**
 * This component runs as a side effect to fix widget styling issues
 * It can be included at the top level of the application
 */
const GlobalWidgetStyler: React.FC = () => {
  useEffect(() => {
    // Apply widget styling on mount and window resize
    const handleResize = () => {
      applyWidgetStyling();
    };

    // Initial application
    const timer = setTimeout(() => {
      applyWidgetStyling();
    }, 100);

    // Add resize listener for responsive fixes
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // This component does not render anything
  return null;
};

export default GlobalWidgetStyler;
