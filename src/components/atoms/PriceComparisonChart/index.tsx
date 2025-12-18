"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { iPriceData } from "@/interfaces/iChartData";
import {
  PRIMARY_COLOR,
  GRAY_COLOR_5,
  GRAY_COLOR_6,
  formatCurrency,
} from "@/utils/chartConstants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface iPriceComparisonChartProps {
  data: iPriceData[];
  isLoading?: boolean;
}

function hasData(data: iPriceData[]): boolean {
  return data && data.length > 0;
}

function prepareChartData(prices: iPriceData[]) {
  return {
    labels: prices.map((item) => item.category),
    datasets: [
      {
        label: "Average Price",
        data: prices.map((item) => item.averagePrice),
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 4,
      },
      {
        label: "Min Price",
        data: prices.map((item) => item.minPrice),
        backgroundColor: GRAY_COLOR_5,
        borderRadius: 4,
      },
      {
        label: "Max Price",
        data: prices.map((item) => item.maxPrice),
        backgroundColor: GRAY_COLOR_6,
        borderRadius: 4,
      },
    ],
  };
}

function getChartOptions(): ChartOptions<"bar"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${formatCurrency(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
        ticks: {
          callback: function (value) {
            return formatCurrency(Number(value));
          },
        },
      },
    },
  };
}

const PriceComparisonChart: React.FC<iPriceComparisonChartProps> = ({
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PriceComparisonChart;

