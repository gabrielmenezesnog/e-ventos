"use client";

import { iTickets } from "@/interfaces/iTickets";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useLoading } from "@/context/Loading";
import Tooltip from "../Tooltip";

interface iProps {
  ticket: iTickets;
  vertical?: boolean;
  unlimitedWidth?: boolean;
  grid?: boolean;
}

const EventCard = ({ ticket, vertical, unlimitedWidth, grid }: iProps) => {
  const { t, language } = useTranslation();
  const { showLoading } = useLoading();

  const darkClass = "bg-black shadow-lg";
  const lightClass = "bg-gray-800 shadow-lg";

  const theme = ticket.sold_quantity > 900 ? darkClass : lightClass;
  const textClass = "text-white";

  const dateLocale = language === "pt-BR" ? "pt-BR" : "en-US";

  const handleBuyClick = () => {
    showLoading(t("common.loading"));
  };

  return (
    <li
      key={ticket.id}
      className={`flex-shrink-0 ${theme} rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-xl transform-gpu relative group ${
        grid
          ? "w-full h-[280px]"
          : vertical
          ? "w-full h-[280px]"
          : unlimitedWidth
          ? "w-[320px] h-[280px]"
          : "max-w-[400px] h-[280px]"
      } flex flex-col`}
      style={{ transformOrigin: "center" }}
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex flex-row items-start gap-3 mb-4">
          <div className="h-3 w-4 bg-primary rounded-sm flex-shrink-0 mt-1" />
          <h3 className={`text-xl font-bold leading-tight ${textClass} flex-1`}>
            {ticket.name}
          </h3>
        </div>

        <div className="mb-6">
          <p className={`text-2xl font-bold mb-1 ${textClass}`}>
            R$ {ticket.price.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6 flex-1">
          <div className="flex flex-col gap-1">
            <p className={`text-sm font-medium ${textClass} opacity-90`}>
              {ticket.local}
            </p>
            <p className={`text-sm ${textClass} opacity-80`}>
              {new Date(ticket.date).toLocaleDateString(dateLocale, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {ticket.sold_quantity > 900 && (
        <div className="absolute bottom-4 left-4">
          <Tooltip
            content={`${ticket.sold_quantity} ${t("eventCard.ticketsSold")}`}
            position="bottom-right"
          >
            <div className="bg-white text-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-200 border border-red-200">
              <span className="text-lg">🔥</span>
            </div>
          </Tooltip>
        </div>
      )}

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link href={`/event/${ticket.id}`}>
          <button
            onClick={handleBuyClick}
            className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200"
          >
            {t("eventCard.buy")}
          </button>
        </Link>
      </div>
    </li>
  );
};

export default EventCard;
