"use client";

import React from "react";
import { iCategoryData } from "@/interfaces/iChartData";
import { iGenreData } from "@/interfaces/iChartData";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPercentage } from "@/utils/chartConstants";

interface iInsightsStatsPanelProps {
  categories: iCategoryData[];
  genres: iGenreData[];
  showDetails: boolean;
}

function hasData(categories: iCategoryData[], genres: iGenreData[]): boolean {
  return (
    (categories && categories.length > 0) || (genres && genres.length > 0)
  );
}

function calculateTotalEvents(categories: iCategoryData[]): number {
  return categories.reduce((total, category) => total + category.count, 0);
}

function calculateTotalSales(genres: iGenreData[]): number {
  return genres.reduce((total, genre) => total + genre.sales, 0);
}

const InsightsStatsPanel: React.FC<iInsightsStatsPanelProps> = ({
  categories,
  genres,
  showDetails,
}) => {
  const { t } = useTranslation();

  if (!showDetails) {
    return null;
  }

  if (!hasData(categories, genres)) {
    return null;
  }

  const totalEvents = calculateTotalEvents(categories);
  const totalSales = calculateTotalSales(genres);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6 transition-opacity duration-300 opacity-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-11 mb-4">
            {t("insights.categoryBreakdown")}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-11">
                {t("insights.totalEvents")}
              </span>
              <span className="text-sm font-semibold text-gray-11">
                {totalEvents}
              </span>
            </div>
            {categories.map((category) => (
              <div
                key={category.category}
                className="flex justify-between items-center"
              >
                <span className="text-sm text-gray-11">{category.category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-11">
                    {category.count} eventos
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {formatPercentage(category.percentage)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-11 mb-4">
            {t("insights.genreBreakdown")}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-11">
                {t("insights.totalSales")}
              </span>
              <span className="text-sm font-semibold text-gray-11">
                {totalSales.toLocaleString()}
              </span>
            </div>
            {genres.map((genre) => (
              <div
                key={genre.genre}
                className="flex justify-between items-center"
              >
                <span className="text-sm text-gray-11">{genre.genre}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-11">
                    {genre.events} eventos
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {genre.sales.toLocaleString()} vendas
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsStatsPanel;

