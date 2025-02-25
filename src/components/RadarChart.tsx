import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface RadarChartProps {
  availability: string;
  integrity: string;
  confidentiality: string;
}

const getLevelScore = (level: string): number => {
  const scores: { [key: string]: number } = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };
  return scores[level] || 0;
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

      chartInstance.current = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Availability", "Integrity", "Confidentiality"],
          datasets: [
            {
              label: "CIA Levels",
              data: [
                getLevelScore(availability),
                getLevelScore(integrity),
                getLevelScore(confidentiality),
              ],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              pointBackgroundColor: "rgb(54, 162, 235)",
            },
          ],
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
              max: 4,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    } catch (error) {
      // Silently handle errors in test environment
      if (process.env.NODE_ENV !== "test") {
        console.error("Error initializing chart:", error);
      }
    }

    return () => {
      if (chartInstance.current) {
        try {
          chartInstance.current.destroy();
        } catch (error) {
          // Silently handle errors in test environment
          if (process.env.NODE_ENV !== "test") {
            console.error("Error destroying chart:", error);
          }
        }
      }
    };
  }, [availability, integrity, confidentiality]);

  return (
    <div className="w-full max-w-md mx-auto" data-testid="radar-chart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default RadarChart;
