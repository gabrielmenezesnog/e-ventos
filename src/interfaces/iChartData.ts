export interface iCategoryData {
  category: string;
  count: number;
  percentage: number;
}

export interface iMonthlySalesData {
  month: string;
  sales: number;
  events: number;
}

export interface iGenreData {
  genre: string;
  sales: number;
  events: number;
}

export interface iLocationData {
  location: string;
  count: number;
}

export interface iPriceData {
  category: string;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
}

