import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import type {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import {
  SECURITY_LEVEL_COLORS,
  SecurityLevelKey,
  SECURITY_LEVELS,
} from "../constants/appConstants";

interface RadarChartProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  className?: string;
  height?: string;
  width?: string;
}

// Map security levels to numeric values for the radar chart
const levelToValue = (level: string): number => {
  switch (level.toUpperCase()) {
    case "NONE":
      return 0;
    case "LOW":
      return 1;
    case "MODERATE":
      return 2;
    case "HIGH":
      return 3;
    case "VERY HIGH":
      return 4;
    default:
      return 0;
  }
};

// Convert numeric value back to level name for accessibility and tooltips
const valueToLevel = (value: number): string => {
  switch (value) {
    case 0:
      return SECURITY_LEVELS.NONE;
    case 1:
      return SECURITY_LEVELS.LOW;
    case 2:
      return SECURITY_LEVELS.MODERATE;
    case 3:
      return SECURITY_LEVELS.HIGH;
    case 4:
      return SECURITY_LEVELS.VERY_HIGH;
    default:
      return SECURITY_LEVELS.NONE;
  }
};

// Get normalized level key for consistent color mapping
const getNormalizedLevel = (level: string): SecurityLevelKey => {
  return level.toUpperCase().replace(/\s+/g, "_") as SecurityLevelKey;
};

const RadarChart: React.FC<RadarChartProps> = ({
  availability,
  integrity,
  confidentiality,
  className = "",
  height = "16rem",
  width = "100%",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Generate text summary of the data for accessibility
  const getAccessibleSummary = (): string => {
    return `Security assessment chart showing: Availability at ${availability} level, Integrity at ${integrity} level, and Confidentiality at ${confidentiality} level.`;
  };

  useEffect(() => {
    if (!canvasRef.current) {
      setRenderError("Canvas element not available");
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      setRenderError("Canvas context not available");
      return;
    }

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    try {
      // Get colors based on security levels
      const availabilityColor =
        SECURITY_LEVEL_COLORS[getNormalizedLevel(availability)] || "#cccccc";
      const integrityColor =
        SECURITY_LEVEL_COLORS[getNormalizedLevel(integrity)] || "#cccccc";
      const confidentialityColor =
        SECURITY_LEVEL_COLORS[getNormalizedLevel(confidentiality)] || "#cccccc";

      // Data values based on security levels
      const availabilityValue = levelToValue(availability);
      const integrityValue = levelToValue(integrity);
      const confidentialityValue = levelToValue(confidentiality);

      // Define chart data with proper typing
      const chartData: ChartData = {
        labels: ["Availability", "Integrity", "Confidentiality"],
        datasets: [
          {
            label: "Security Level",
            data: [availabilityValue, integrityValue, confidentialityValue],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            pointBackgroundColor: [
              availabilityColor,
              integrityColor,
              confidentialityColor,
            ],
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(75, 192, 192, 1)",
            pointRadius: 6,
          },
        ],
      };

      // Define chart options with proper typing
      const chartOptions: ChartOptions = {
        scales: {
          r: {
            angleLines: {
              display: true,
              color: "rgba(0,0,0,0.1)",
            },
            suggestedMin: 0,
            suggestedMax: 4,
            ticks: {
              stepSize: 1,
              // Remove max property which doesn't exist in RadialTickOptions
              display: false,
            },
            pointLabels: {
              font: {
                size: 14,
                weight: "bold",
              },
              color: ctx?.canvas?.closest?.(".dark") ? "#e5e7eb" : "#374151",
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 15,
              usePointStyle: true,
              color: ctx?.canvas?.closest?.(".dark") ? "#e5e7eb" : "#374151",
            },
          },
          tooltip: {
            callbacks: {
              label: function (context: TooltipItem<"radar">) {
                const value = context.parsed.r;
                return `Level: ${valueToLevel(value)}`;
              },
              title: function (tooltipItems: TooltipItem<"radar">[]) {
                // Fix the possibly undefined error with optional chaining
                return tooltipItems[0]?.label || "";
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      };

      // Define chart configuration with proper typing
      const chartConfig: ChartConfiguration = {
        type: "radar",
        data: chartData,
        options: chartOptions,
      };

      // Create chart instance
      chartRef.current = new Chart(ctx, chartConfig);
      setRenderError(null);
    } catch (error) {
      setRenderError("Error rendering chart");
      console.error("Error rendering radar chart:", error);
    }

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [availability, integrity, confidentiality]);

  return (
    <div
      className={`radar-chart-container ${className}`}
      style={{ height, width }}
      aria-label="Security Radar Chart"
      role="img"
    >
      {renderError ? (
        <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-red-500 dark:text-red-400 text-sm">
            Unable to render chart: {renderError}
          </p>
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            data-testid="radar-chart"
            aria-label={getAccessibleSummary()}
          ></canvas>
          <div className="sr-only" data-testid="accessible-description">
            {getAccessibleSummary()}
          </div>
        </>
      )}
    </div>
  );
};

export default RadarChart;
