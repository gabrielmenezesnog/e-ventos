import React from "react";
import { iTicketTypeSimple } from "@/interfaces/iTicketTypeSimple";
import Button from "../Button";
import { useTranslation } from "@/hooks/useTranslation";

interface TicketTypeListProps {
  ticketTypes: iTicketTypeSimple[];
  selectedType: string;
  onChangeType: (type: string) => void;
}

const TicketTypeList: React.FC<TicketTypeListProps> = ({
  ticketTypes,
  selectedType,
  onChangeType,
}) => {
  const { t } = useTranslation();

  return (
    <ul className="flex flex-row items-center gap-3 mb-8">
      {ticketTypes.map(({ type }) => (
        <li key={type}>
          <Button
            type="default"
            className={`sub_button ${type === selectedType ? "selected" : ""}`}
            onClick={() => onChangeType(type)}
          >
            {t(`ticketTypes.${type}`)}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default TicketTypeList;
