import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface RadarChartProps {
  availability: string;
  integrity: string;
  confidentiality: string;
}

// Convert security level string to numeric value for the chart
const getLevelScore = (level: string): number => {
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  return levels.indexOf(level);
};

const RadarChart: React.FC<RadarChartProps> = ({
  availability,
  integrity,
  confidentiality,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Only run in a browser environment with Canvas support
    if (!chartRef.current || typeof window === "undefined") return;

    try {
      // Safely destroy existing chart instance if it exists
      if (
        chartInstance.current &&
        typeof chartInstance.current.destroy === "function"
      ) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      // Skip chart creation if context isn't available (like in test environment)
      if (!ctx) return;

      const darkMode = document.documentElement.classList.contains("dark");

      // Improved text color for better visibility in both modes
      const textColor = darkMode
        ? "rgba(255, 255, 255, 1)" // Brighter white in dark mode
        : "rgba(0, 0, 0, 0.9)"; // Darker black in light mode

      const gridColor = darkMode
        ? "rgba(255, 255, 255, 0.2)" // More visible grid in dark mode
        : "rgba(0, 0, 0, 0.15)"; // Slightly darker grid in light mode

      const backgroundColor = darkMode
        ? "rgba(59, 130, 246, 0.25)" // More visible background in dark mode
        : "rgba(59, 130, 246, 0.15)"; // Slightly more visible in light mode

      chartInstance.current = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Availability", "Integrity", "Confidentiality"],
          datasets: [
            {
              label: "Security Levels",
              data: [
                getLevelScore(availability),
                getLevelScore(integrity),
                getLevelScore(confidentiality),
              ],
              backgroundColor: backgroundColor,
              borderColor: darkMode
                ? "rgba(59, 180, 246, 0.9)" // Brighter blue in dark mode
                : "rgba(59, 130, 246, 0.9)", // Standard blue in light mode
              borderWidth: 2,
              pointBackgroundColor: darkMode
                ? "rgba(59, 180, 246, 1)"
                : "rgba(59, 130, 246, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(59, 130, 246, 1)",
              pointRadius: 5, // Larger points
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true, // Show the legend
              position: "top",
              labels: {
                color: textColor,
                font: {
                  size: 14,
                  weight: 600, // Changed from '600' to 600 (number)
                },
              },
              title: {
                display: true,
                text: "Security Profile",
                color: textColor,
                font: {
                  size: 16,
                  weight: 700, // Changed from '700' to 700 (number)
                },
              },
            },
            tooltip: {
              backgroundColor: darkMode
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(255, 255, 255, 0.95)",
              titleColor: darkMode
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(0, 0, 0, 0.9)",
              bodyColor: darkMode
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
              padding: 10,
              cornerRadius: 4,
              callbacks: {
                label: function (context) {
                  let label = "";
                  if (context.dataIndex === 0) {
                    label = `Availability: ${availability}`;
                  } else if (context.dataIndex === 1) {
                    label = `Integrity: ${integrity}`;
                  } else if (context.dataIndex === 2) {
                    label = `Confidentiality: ${confidentiality}`;
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 4,
              ticks: {
                stepSize: 1,
                display: false,
              },
              grid: {
                color: gridColor,
                circular: true,
                lineWidth: 1.5, // Thicker grid lines
              },
              angleLines: {
                color: gridColor,
                lineWidth: 1.5, // Thicker angle lines
              },
              pointLabels: {
                color: textColor,
                font: {
                  size: 14, // Larger font size
                  weight: 600, // Changed from '600' to 600 (number)
                },
                padding: 12, // More padding around labels
              },
            },
          },
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV !== "test") {
        console.error("Error initializing chart:", error);
      }
    }

    return () => {
      // Safely destroy chart on unmount
      if (
        chartInstance.current &&
        typeof chartInstance.current.destroy === "function"
      ) {
        chartInstance.current.destroy();
      }
    };
  }, [availability, integrity, confidentiality]);

  return (
    <div
      className="flex flex-col justify-center items-center h-full"
      data-testid="radar-chart"
    >
      <div className="w-full mb-4">
        {/* Add legend key above chart */}
        <div className="flex justify-center items-center space-x-4 mb-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm font-medium">Current Profile</span>
          </div>
        </div>
        {/* Add current levels below chart for easy reference */}
        <div className="flex justify-around mt-2 text-center">
          <div className="flex flex-col">
            <span className="text-xs">Availability</span>
            <span
              className="text-sm font-semibold"
              data-testid="radar-availability-value"
            >
              {availability}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs">Integrity</span>
            <span
              className="text-sm font-semibold"
              data-testid="radar-integrity-value"
            >
              {integrity}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs">Confidentiality</span>
            <span
              className="text-sm font-semibold"
              data-testid="radar-confidentiality-value"
            >
              {confidentiality}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-xs mx-auto">
        <canvas
          ref={chartRef}
          className="p-2"
          data-testid="radar-chart-canvas"
        ></canvas>
      </div>
    </div>
  );
};

export default RadarChart;
