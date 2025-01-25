"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section>
      <div className="bg-black relative shadow-white mb-28">
        <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-6xl text-white font-medium leading-tight">
              isso tudo é muito <span className="text-primary">show!</span>
            </h1>
            <p className="text-gray_5 mt-4 mb-10">
              Descubra os melhores eventos para todos os estilos e ocasiões.
              Shows, peças, esportes e muito mais: aqui você encontra o ingresso
              ideal para viver experiências inesquecíveis.
            </p>

            <button>
              <Link href="/events" className="font-medium">
                ver eventos
              </Link>
            </button>
          </div>

          <Image
            src="/images/img-intro.jpg"
            alt="Show Alok BC 15/10/2025 - Fotografia"
            className="rounded-lg"
            width={640}
            height={800}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
