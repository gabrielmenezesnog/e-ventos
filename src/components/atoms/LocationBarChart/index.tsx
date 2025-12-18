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
import { iLocationData } from "@/interfaces/iChartData";
import { CHART_COLORS } from "@/utils/chartConstants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface iLocationBarChartProps {
  data: iLocationData[];
  isLoading?: boolean;
}

function hasData(data: iLocationData[]): boolean {
  return data && data.length > 0;
}

function prepareChartData(locations: iLocationData[]) {
  return {
    labels: locations.map((item) => item.location),
    datasets: [
      {
        label: "Events",
        data: locations.map((item) => item.count),
        backgroundColor: CHART_COLORS.slice(0, locations.length),
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
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
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
      },
    },
  };
}

const LocationBarChart: React.FC<iLocationBarChartProps> = ({
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

export default LocationBarChart;

