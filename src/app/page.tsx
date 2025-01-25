import HeroSection from "@/components/atoms/HeroSection";
import BestSellersCarousel from "@/components/molecules/BestSellersCarousel";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BestSellersCarousel tickets={[]} />
    </main>
  );
}
