import React from "react";
import HeroSection from "@/components/atoms/HeroSection";
import BestSellersSection from "@/components/molecules/BestSellersSection";
import EventInsightsSection from "@/components/molecules/EventInsightsSection";
import { getBestSellers } from "@/services/tickets/getBestSellers";
import { getTickets } from "@/services/tickets/getTickets";
import { iTickets } from "@/interfaces/iTickets";

export default async function Home() {
  let bestSellerTickets: iTickets[] = [];
  let allTickets: iTickets[] = [];

  try {
    bestSellerTickets = await getBestSellers();
  } catch {
    bestSellerTickets = [];
  }

  try {
    const ticketsResponse = await getTickets();
    if (!ticketsResponse.error) {
      allTickets = ticketsResponse.data;
    }
  } catch {
    allTickets = [];
  }

  return (
    <main>
      <HeroSection />
      {bestSellerTickets.length > 0 && (
        <BestSellersSection tickets={bestSellerTickets} isLoading={false} />
      )}
      <EventInsightsSection initialTickets={allTickets} />
    </main>
  );
}
