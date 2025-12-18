"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { iCategoryData } from "@/interfaces/iChartData";
import { CHART_COLORS, formatPercentage } from "@/utils/chartConstants";

ChartJS.register(ArcElement, Tooltip, Legend);

interface iCategoryPieChartProps {
  data: iCategoryData[];
  isLoading?: boolean;
}

function hasData(data: iCategoryData[]): boolean {
  return data && data.length > 0;
}

function prepareChartData(categories: iCategoryData[]) {
  return {
    labels: categories.map((item) => item.category),
    datasets: [
      {
        data: categories.map((item) => item.count),
        backgroundColor: CHART_COLORS.slice(0, categories.length),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };
}

function getChartOptions(): ChartOptions<"pie"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (acc: number, val: number) => acc + val,
              0
            );
            const percentage = (value / total) * 100;
            return `${label}: ${value} (${formatPercentage(percentage)})`;
          },
        },
      },
    },
  };
}

const CategoryPieChart: React.FC<iCategoryPieChartProps> = ({
  data,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!hasData(data)) {
    return null;
  }

  const chartData = prepareChartData(data);
  const options = getChartOptions();

  return (
    <div className="w-full h-[300px]">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CategoryPieChart;

