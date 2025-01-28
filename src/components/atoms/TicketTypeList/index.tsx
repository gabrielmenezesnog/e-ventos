import React from "react";

interface TicketTypeListProps {
  ticketTypes: { type: string }[];
  selectedType: string;
  onChangeType: (type: string) => void;
}

const TicketTypeList: React.FC<TicketTypeListProps> = ({
  ticketTypes,
  selectedType,
  onChangeType,
}) => {
  return (
    <ul className="flex flex-row items-center gap-3 mb-8">
      {ticketTypes.map(({ type }) => (
        <li key={type}>
          <button
            className={`sub_button ${type === selectedType ? "selected" : ""}`}
            onClick={() => onChangeType(type)}
          >
            {type}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TicketTypeList;
