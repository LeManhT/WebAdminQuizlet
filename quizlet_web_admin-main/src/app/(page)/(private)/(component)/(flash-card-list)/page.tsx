import { IFlashCardModel } from "@/app/interfaces/response";
import React from "react";

const FlashCardList = ({ cards }: { cards: IFlashCardModel[] }) => {
  return (
    <div>
      <h4>Danh sách Flashcards</h4>
      <ul>
        {cards.length > 0 ? (
          cards.map((card) => (
            <li key={card.id}>
              <strong>{card.term}</strong>: {card.definition}
            </li>
          ))
        ) : (
          <li>Không có Flashcards nào.</li>
        )}
      </ul>
    </div>
  );
};

export default FlashCardList;
