import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { SECURITY_LEVELS } from "../constants/appConstants";

interface RadarChartProps {
  availability: string;
  integrity: string;
  confidentiality: string;
  className?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({
  availability,
  integrity,
  confidentiality,
  className = "",
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper function to convert security level to numeric value for chart
  const getSecurityLevelValue = (level: string): number => {
    switch (level) {
      case "Very High":
        return 4;
      case "High":
        return 3;
      case "Moderate":
        return 2;
      case "Low":
        return 1;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (!chartRef.current) return;

    try {
      // Get values for radar chart
      const availabilityValue = getSecurityLevelValue(availability);
      const integrityValue = getSecurityLevelValue(integrity);
      const confidentialityValue = getSecurityLevelValue(confidentiality);

      // Clean up any existing chart
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }

      // Create the radar chart with improved styling
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Helper function to get colors based on dark mode
      const isDarkMode = document.documentElement.classList.contains("dark");
      const getChartColors = () => {
        return {
          backgroundColor: isDarkMode
            ? "rgba(0, 204, 102, 0.2)"
            : "rgba(54, 162, 235, 0.2)",
          borderColor: isDarkMode ? "rgb(0, 204, 102)" : "rgb(54, 162, 235)",
          textColor: isDarkMode ? "#e2e8f0" : "#2d3748",
          gridColor: isDarkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
          pointBackgroundColor: isDarkMode
            ? "rgb(0, 235, 117)"
            : "rgb(54, 162, 235)",
        };
      };

      const colors = getChartColors();

      chartInstanceRef.current = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Availability", "Integrity", "Confidentiality"],
          datasets: [
            {
              label: "Security Level",
              data: [availabilityValue, integrityValue, confidentialityValue],
              backgroundColor: colors.backgroundColor,
              borderColor: colors.borderColor,
              borderWidth: 2,
              pointBackgroundColor: colors.pointBackgroundColor,
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: colors.borderColor,
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            r: {
              min: 0,
              max: 4,
              ticks: {
                stepSize: 1,
                showLabelBackdrop: false,
                color: colors.textColor,
                z: 1,
              },
              grid: {
                color: colors.gridColor,
              },
              pointLabels: {
                color: colors.textColor,
                font: {
                  weight: "bold",
                },
              },
              angleLines: {
                color: colors.gridColor,
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
                  const labels = [
                    "None",
                    "Low",
                    "Moderate",
                    "High",
                    "Very High",
                  ];
                  const value = context.raw as number;
                  return `${context.label}: ${labels[value] || "Unknown"}`;
                },
              },
            },
          },
        },
      });

      setError(null);
    } catch (err) {
      console.error("Failed to create chart:", err);
      setError("Could not render security chart");
    }
  }, [availability, integrity, confidentiality]);

  // Clean up chart on component unmount
  useEffect(() => {
    // Return cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  // Add fallback or error display
  if (error) {
    return (
      <div
        className="border border-red-300 rounded-md p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
        data-testid="radar-chart-error"
      >
        {error}
      </div>
    );
  }

  // Apply proper wrapper classes to ensure the chart fits in its box correctly
  return (
    <div
      className={`radar-chart-container ${className} w-full flex flex-col items-center justify-center relative max-h-[300px]`}
      data-testid="radar-chart"
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ minHeight: "250px" }}
      >
        <canvas
          ref={chartRef}
          aria-label="CIA security assessment radar chart"
          data-testid="radar-chart-canvas"
          className="max-w-full"
        />
      </div>
      {/* Add value display labels below chart */}
      <div className="flex justify-around w-full mt-2 text-xs text-gray-600 dark:text-gray-400">
        <div data-testid="radar-availability-value">A: {availability}</div>
        <div data-testid="radar-integrity-value">I: {integrity}</div>
        <div data-testid="radar-confidentiality-value">
          C: {confidentiality}
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
