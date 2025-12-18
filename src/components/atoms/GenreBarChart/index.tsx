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
import { iGenreData } from "@/interfaces/iChartData";
import { PRIMARY_COLOR } from "@/utils/chartConstants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface iGenreBarChartProps {
  data: iGenreData[];
  isLoading?: boolean;
}

function hasData(data: iGenreData[]): boolean {
  return data && data.length > 0;
}

function prepareChartData(genres: iGenreData[]) {
  return {
    labels: genres.map((item) => item.genre),
    datasets: [
      {
        label: "Sales",
        data: genres.map((item) => item.sales),
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 4,
      },
    ],
  };
}

function getChartOptions(): ChartOptions<"bar"> {
  return {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
}

const GenreBarChart: React.FC<iGenreBarChartProps> = ({
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

export default GenreBarChart;

