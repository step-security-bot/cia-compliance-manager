import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface RadarChartProps {
  availability: string;
  integrity: string;
  confidentiality: string;
}

// Helper function to convert level to numeric score
const getLevelScore = (level: string): number => {
  switch (level) {
    case "None":
      return 0;
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
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      // Skip chart creation if context isn't available (like in test environment)
      if (!ctx) return;

      const darkMode = document.documentElement.classList.contains("dark");
      const textColor = darkMode
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(30, 41, 59, 0.9)";
      const gridColor = darkMode
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(0, 0, 0, 0.1)";
      const backgroundColor = darkMode
        ? "rgba(59, 130, 246, 0.15)"
        : "rgba(59, 130, 246, 0.1)";

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
              borderColor: "rgba(59, 130, 246, 0.8)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(59, 130, 246, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(59, 130, 246, 1)",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
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
              },
              angleLines: {
                color: gridColor,
                lineWidth: 1,
              },
              pointLabels: {
                color: textColor,
                font: {
                  family: "'Inter', sans-serif",
                  size: 12,
                  weight: 500,
                },
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
      if (
        chartInstance.current &&
        typeof chartInstance.current.destroy === "function"
      ) {
        try {
          chartInstance.current.destroy();
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error("Error destroying chart:", error);
          }
        }
      }
    };
  }, [availability, integrity, confidentiality]);

  return (
    <div
      className="flex justify-center items-center h-full"
      data-testid="radar-chart"
    >
      <div className="w-full max-w-xs mx-auto">
        <canvas ref={chartRef} className="p-2" />
      </div>
    </div>
  );
};

export default RadarChart;
