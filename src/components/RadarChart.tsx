import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

interface RadarChartProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  className?: string;
  testId?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({
  availability,
  integrity,
  confidentiality,
  className = "",
  testId = "radar-chart",
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<"radar", number[], string> | null>(
    null
  );
  // Add state to track render errors for testing
  const [renderError, setRenderError] = useState<string | null>(null);

  // Add visible security levels for testing
  const [securityLevels] = useState({
    availability,
    integrity,
    confidentiality,
  });

  // Convert security levels to numerical values
  const mapLevelToValue = (level: string): number => {
    switch (level) {
      case "None":
        return 0;
      case "Basic":
      case "Low":
        return 1;
      case "Moderate":
        return 2;
      case "High":
        return 3;
      case "Very High":
        return 4;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (!chartRef.current) return;

    try {
      // Cleanup previous chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Add null checking for chart context
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) {
        setRenderError("Could not get canvas context");
        return;
      }

      const availabilityValue = mapLevelToValue(availability);
      const integrityValue = mapLevelToValue(integrity);
      const confidentialityValue = mapLevelToValue(confidentiality);

      // Determine if we're in dark mode
      const isDarkMode = document.documentElement.classList.contains("dark");

      // Set chart colors based on theme
      const backgroundColor = isDarkMode
        ? "rgba(0, 204, 102, 0.2)"
        : "rgba(0, 102, 51, 0.2)";
      const borderColor = isDarkMode ? "#00cc66" : "#006633";
      const gridColor = isDarkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)";
      const textColor = isDarkMode ? "#f0f0f0" : "#222222";

      // Create chart
      chartInstanceRef.current = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Availability", "Integrity", "Confidentiality"],
          datasets: [
            {
              label: "Security Profile",
              data: [availabilityValue, integrityValue, confidentialityValue],
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 2,
              pointBackgroundColor: borderColor,
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: borderColor,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            r: {
              angleLines: {
                color: gridColor,
              },
              grid: {
                color: gridColor,
              },
              pointLabels: {
                color: textColor,
                font: {
                  size: 12,
                },
              },
              min: 0,
              max: 4,
              ticks: {
                backdropColor: "transparent",
                color: textColor,
                z: 100,
                stepSize: 1,
                font: {
                  size: 10,
                },
                callback: function (value) {
                  const levels = [
                    "None",
                    "Basic",
                    "Moderate",
                    "High",
                    "Very High",
                  ];
                  return levels[value as number] || "";
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const levels = [
                    "None",
                    "Basic",
                    "Moderate",
                    "High",
                    "Very High",
                  ];
                  const value = context.raw as number;
                  return `${context.label}: ${levels[value] || ""}`;
                },
              },
            },
          },
        },
      });

      // Handle resize events to ensure the chart remains responsive
      const resizeHandler = () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.resize();
        }
      };

      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    } catch (error) {
      setRenderError(error instanceof Error ? error.message : String(error));
    }
  }, [availability, integrity, confidentiality]);

  return (
    <div
      className={`radar-chart-container ${className}`}
      data-testid={`${testId}-container`}
    >
      {renderError ? (
        <div data-testid={`${testId}-error`} className="error-message">
          Error rendering chart: {renderError}
        </div>
      ) : (
        <>
          {/* Add hidden spans with security values for testing */}
          <span
            data-testid={`radar-availability-value`}
            style={{ display: "none" }}
          >
            A: {securityLevels.availability}
          </span>
          <span
            data-testid={`radar-integrity-value`}
            style={{ display: "none" }}
          >
            I: {securityLevels.integrity}
          </span>
          <span
            data-testid={`radar-confidentiality-value`}
            style={{ display: "none" }}
          >
            C: {securityLevels.confidentiality}
          </span>
          <canvas
            ref={chartRef}
            data-testid={testId}
            className={`max-w-full h-auto ${className}`}
            aria-label="Security radar chart showing Availability, Integrity, and Confidentiality levels"
          />
        </>
      )}
    </div>
  );
};

export default RadarChart;
