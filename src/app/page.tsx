import HeroSection from "@/components/atoms/HeroSection";
import BestSellersSection from "@/components/molecules/BestSellersSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BestSellersSection tickets={[]} />
    </main>
  );
}
