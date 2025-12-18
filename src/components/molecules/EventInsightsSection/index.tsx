"use client";

import React, { useState, useEffect, useMemo } from "react";
import SectionTitle from "@/components/atoms/Title/SectionTitle";
import CategoryPieChart from "@/components/atoms/CategoryPieChart";
import GenreBarChart from "@/components/atoms/GenreBarChart";
import InsightsFilterDropdown from "@/components/atoms/InsightsFilterDropdown";
import InsightsStatsPanel from "@/components/atoms/InsightsStatsPanel";
import { getTickets } from "@/services/tickets/getTickets";
import { getEventStats } from "@/services/stats/getEventStats";
import { iTickets } from "@/interfaces/iTickets";
import { iEventStats } from "@/interfaces/iEventStats";
import { iCategoryData } from "@/interfaces/iChartData";
import { iGenreData } from "@/interfaces/iChartData";
import { iInsightsFilterOption } from "@/interfaces/iInsightsFilter";
import { useTranslation } from "@/hooks/useTranslation";

interface iEventInsightsSectionProps {
  initialTickets?: iTickets[];
}

const FILTER_ALL = "all";
const FILTER_TOP5 = "top5";
const FILTER_TOP10 = "top10";
const FILTER_DETAILS = "details";
const TOP_N_COUNT = 5;
const TOP_TEN_COUNT = 10;

function hasTickets(tickets: iTickets[]): boolean {
  return tickets && tickets.length > 0;
}

function hasStats(stats: iEventStats): boolean {
  return (
    stats.categories.length > 0 ||
    stats.monthlySales.length > 0 ||
    stats.genres.length > 0 ||
    stats.locations.length > 0 ||
    stats.prices.length > 0
  );
}

function filterCategoriesByTopN(
  data: iCategoryData[],
  n: number
): iCategoryData[] {
  if (!data || data.length === 0) {
    return [];
  }

  const sorted = [...data].sort((a, b) => b.count - a.count);
  return sorted.slice(0, n);
}

function filterGenresByTopN(data: iGenreData[], n: number): iGenreData[] {
  if (!data || data.length === 0) {
    return [];
  }

  const sorted = [...data].sort((a, b) => b.sales - a.sales);
  return sorted.slice(0, n);
}

function shouldShowDetails(filterValue: string): boolean {
  return filterValue === FILTER_DETAILS;
}

const EventInsightsSection: React.FC<iEventInsightsSectionProps> = ({
  initialTickets,
}) => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<iTickets[]>(initialTickets || []);
  const [stats, setStats] = useState<iEventStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialTickets);
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(FILTER_TOP5);

  const filterOptions: iInsightsFilterOption[] = [
    {
      id: "filter-all",
      label: "insights.filterAll",
      value: FILTER_ALL,
    },
    {
      id: "filter-top5",
      label: "insights.filterTop5",
      value: FILTER_TOP5,
    },
    {
      id: "filter-top10",
      label: "insights.filterTop10",
      value: FILTER_TOP10,
    },
    {
      id: "filter-details",
      label: "insights.filterDetails",
      value: FILTER_DETAILS,
    },
  ];

  const filteredCategories = useMemo((): iCategoryData[] => {
    if (!stats || !stats.categories) {
      return [];
    }

    if (selectedFilter === FILTER_TOP5) {
      return filterCategoriesByTopN(stats.categories, TOP_N_COUNT);
    }

    if (selectedFilter === FILTER_TOP10) {
      return filterCategoriesByTopN(stats.categories, TOP_TEN_COUNT);
    }

    return stats.categories;
  }, [stats, selectedFilter]);

  const filteredGenres = useMemo((): iGenreData[] => {
    if (!stats || !stats.genres) {
      return [];
    }

    if (selectedFilter === FILTER_TOP5) {
      return filterGenresByTopN(stats.genres, TOP_N_COUNT);
    }

    if (selectedFilter === FILTER_TOP10) {
      return filterGenresByTopN(stats.genres, TOP_TEN_COUNT);
    }

    return stats.genres;
  }, [stats, selectedFilter]);

  const showDetails = useMemo((): boolean => {
    return shouldShowDetails(selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      if (initialTickets) {
        return;
      }

      setIsLoading(true);
      setHasError(false);

      try {
        const response = await getTickets();
        if (response.error) {
          setHasError(true);
          return;
        }

        if (hasTickets(response.data)) {
          setTickets(response.data);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [initialTickets]);

  useEffect(() => {
    async function processStats(): Promise<void> {
      if (!hasTickets(tickets)) {
        return;
      }

      try {
        const processedStats = await getEventStats(tickets);
        if (hasStats(processedStats)) {
          setStats(processedStats);
        }
      } catch {
        setHasError(true);
      }
    }

    processStats();
  }, [tickets]);

  function handleFilterChange(value: string): void {
    setSelectedFilter(value);
  }

  if (isLoading) {
    return (
      <div className="mb-10 mt-[160px]">
        <div className="container px-5">
          <SectionTitle
            normalText={t("insights.title")}
            coloredText={t("insights.titleHighlight")}
            isDark={false}
          />
        </div>
        <div className="container px-5 mt-8">
          <div className="text-center text-gray-500">Loading insights...</div>
        </div>
      </div>
    );
  }

  if (hasError || !stats) {
    return null;
  }

  return (
    <div className="mb-10 mt-[160px]">
      <div className="container px-5">
        <SectionTitle
          normalText={t("insights.title")}
          coloredText={t("insights.titleHighlight")}
          isDark={false}
        />
      </div>

      <div className="container px-5 mt-12">
        <div className="mb-6 mt-6">
          <InsightsFilterDropdown
            options={filterOptions}
            selectedValue={selectedFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-11 mb-4">
              {t("insights.categoryDistribution")}
            </h3>
            <CategoryPieChart data={filteredCategories} isLoading={false} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-11 mb-4">
              {t("insights.topGenres")}
            </h3>
            <GenreBarChart data={filteredGenres} isLoading={false} />
          </div>
        </div>

        <InsightsStatsPanel
          categories={stats.categories}
          genres={stats.genres}
          showDetails={showDetails}
        />
      </div>
    </div>
  );
};

export default EventInsightsSection;
