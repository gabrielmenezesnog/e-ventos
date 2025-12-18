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
import { iMonthlySalesData } from "@/interfaces/iChartData";
import { PRIMARY_COLOR, GRAY_COLOR_5 } from "@/utils/chartConstants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface iMonthlySalesBarChartProps {
  data: iMonthlySalesData[];
  isLoading?: boolean;
}

function hasData(data: iMonthlySalesData[]): boolean {
  return data && data.length > 0;
}

function prepareChartData(monthlySales: iMonthlySalesData[]) {
  return {
    labels: monthlySales.map((item) => item.month),
    datasets: [
      {
        label: "Sales",
        data: monthlySales.map((item) => item.sales),
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 4,
      },
      {
        label: "Events",
        data: monthlySales.map((item) => item.events),
        backgroundColor: GRAY_COLOR_5,
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

const MonthlySalesBarChart: React.FC<iMonthlySalesBarChartProps> = ({
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

export default MonthlySalesBarChart;

