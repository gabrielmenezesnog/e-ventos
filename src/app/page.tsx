import React from "react";
import HeroSection from "@/components/atoms/HeroSection";
import BestSellersSection from "@/components/molecules/BestSellersSection";
import { getBestSellers } from "@/services/tickets/getBestSellers";
import { iTickets } from "@/interfaces/iTickets";

export default async function Home() {
  let tickets: iTickets[] = [];

  try {
    tickets = await getBestSellers();
  } catch {
    console.log("json-server not available, using empty data");
    // Quando o json-server não estiver disponível, usar dados vazios
    tickets = [];
  }

  return (
    <main>
      <HeroSection />
      {tickets.length > 0 && (
        <BestSellersSection tickets={tickets} isLoading={false} />
      )}
    </main>
  );
}
