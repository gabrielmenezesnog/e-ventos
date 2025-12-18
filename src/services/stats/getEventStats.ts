import { iTickets } from "@/interfaces/iTickets";
import { iEventStats } from "@/interfaces/iEventStats";
import { iCategoryData } from "@/interfaces/iChartData";
import { iMonthlySalesData } from "@/interfaces/iChartData";
import { iGenreData } from "@/interfaces/iChartData";
import { iLocationData } from "@/interfaces/iChartData";
import { iPriceData } from "@/interfaces/iChartData";
import { PERCENTAGE_MULTIPLIER, extractLocation } from "@/utils/chartConstants";

interface CategoryCount {
  [key: string]: number;
}

interface GenreCount {
  [key: string]: {
    sales: number;
    events: number;
  };
}

interface LocationCount {
  [key: string]: number;
}

interface MonthlyData {
  [key: number]: {
    sales: number;
    events: number;
  };
}

interface PriceByCategory {
  [key: string]: number[];
}

function calculateCategoryDistribution(tickets: iTickets[]): iCategoryData[] {
  const categoryCount: CategoryCount = {};
  const totalEvents = tickets.length;

  tickets.forEach((ticket) => {
    const category = ticket.category || "Other";
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  return Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
    percentage: (count / totalEvents) * PERCENTAGE_MULTIPLIER,
  }));
}

function calculateMonthlySales(tickets: iTickets[]): iMonthlySalesData[] {
  const monthlyData: MonthlyData = {};

  tickets.forEach((ticket) => {
    const date = new Date(ticket.date);
    const month = date.getMonth();

    if (!monthlyData[month]) {
      monthlyData[month] = {
        sales: 0,
        events: 0,
      };
    }

    monthlyData[month].sales += ticket.sold_quantity || 0;
    monthlyData[month].events += 1;
  });

  return Object.entries(monthlyData)
    .map(([monthStr, data]) => {
      const month = parseInt(monthStr, 10);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return {
        month: monthNames[month],
        sales: data.sales,
        events: data.events,
      };
    })
    .sort((a, b) => {
      const monthOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
}

function calculateGenreDistribution(tickets: iTickets[]): iGenreData[] {
  const genreData: GenreCount = {};

  tickets.forEach((ticket) => {
    if (!ticket.genre) {
      return;
    }

    const genre = ticket.genre;
    if (!genreData[genre]) {
      genreData[genre] = {
        sales: 0,
        events: 0,
      };
    }

    genreData[genre].sales += ticket.sold_quantity || 0;
    genreData[genre].events += 1;
  });

  return Object.entries(genreData)
    .map(([genre, data]) => ({
      genre,
      sales: data.sales,
      events: data.events,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);
}

function calculateLocationDistribution(tickets: iTickets[]): iLocationData[] {
  const locationCount: LocationCount = {};

  tickets.forEach((ticket) => {
    const location = extractLocation(ticket.local);
    locationCount[location] = (locationCount[location] || 0) + 1;
  });

  return Object.entries(locationCount)
    .map(([location, count]) => ({
      location,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function calculatePriceByCategory(tickets: iTickets[]): iPriceData[] {
  const priceByCategory: PriceByCategory = {};

  tickets.forEach((ticket) => {
    const category = ticket.category || "Other";
    if (!priceByCategory[category]) {
      priceByCategory[category] = [];
    }
    priceByCategory[category].push(ticket.price);
  });

  return Object.entries(priceByCategory).map(([category, prices]) => {
    const sortedPrices = prices.sort((a, b) => a - b);
    const sum = prices.reduce((acc, price) => acc + price, 0);
    const average = sum / prices.length;

    return {
      category,
      averagePrice: average,
      minPrice: sortedPrices[0],
      maxPrice: sortedPrices[sortedPrices.length - 1],
    };
  });
}

export async function getEventStats(
  tickets: iTickets[]
): Promise<iEventStats> {
  if (!tickets || tickets.length === 0) {
    return {
      categories: [],
      monthlySales: [],
      genres: [],
      locations: [],
      prices: [],
    };
  }

  const categories = calculateCategoryDistribution(tickets);
  const monthlySales = calculateMonthlySales(tickets);
  const genres = calculateGenreDistribution(tickets);
  const locations = calculateLocationDistribution(tickets);
  const prices = calculatePriceByCategory(tickets);

  return {
    categories,
    monthlySales,
    genres,
    locations,
    prices,
  };
}

