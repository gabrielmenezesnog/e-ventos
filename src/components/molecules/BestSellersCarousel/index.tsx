"use client";

import React from "react";
import SectionTitle from "@/components/atoms/Title/SectionTitle";

interface iProps {
  tickets: [];
}

const BestSellersCarousel: React.FC<iProps> = ({}) => {
  return (
    <div className="mb-10">
      <div className="container">
        <SectionTitle
          normalText="mais procurados"
          coloredText="."
          isDark={false}
        />
      </div>
    </div>
  );
};

export default BestSellersCarousel;
