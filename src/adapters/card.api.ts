import {Card, CardId} from "@/domaine/models/card.model";
import {CreatCard} from "@/services/card.service";


export interface CardApi {
    fetchCards(): Promise<Card[]>;

    fetchCardOfTheDay(): Promise<Card[]>;
    fetchCardById(cardId: CardId): Promise<Card>;
    createCard(creatCard: CreatCard): Promise<void>;
    updateCard(card: Card): Promise<void>;
    deleteCard(cardId: CardId): Promise<void>;
}