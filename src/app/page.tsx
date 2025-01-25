import React from "react";
import HeroSection from "@/components/atoms/HeroSection";
import BestSellersSection from "@/components/molecules/BestSellersSection";
import { getBestSellers } from "@/services/tickets/getBestSellers";
import { iTickets } from "@/interfaces/iTickets";

export default async function Home() {
  let tickets: iTickets[] = [];

  try {
    tickets = await getBestSellers();
  } catch (error) {
    console.error("Failed to fetch best sellers", error);
  }

  return (
    <main>
      <HeroSection />
      <BestSellersSection tickets={tickets} isLoading={false} />
    </main>
  );
}
