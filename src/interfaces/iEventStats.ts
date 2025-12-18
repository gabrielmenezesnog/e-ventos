import { iCategoryData } from "./iChartData";
import { iMonthlySalesData } from "./iChartData";
import { iGenreData } from "./iChartData";
import { iLocationData } from "./iChartData";
import { iPriceData } from "./iChartData";

export interface iEventStats {
  categories: iCategoryData[];
  monthlySales: iMonthlySalesData[];
  genres: iGenreData[];
  locations: iLocationData[];
  prices: iPriceData[];
}

