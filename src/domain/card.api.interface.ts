import {Card, CardId} from "@/domain/models/card.model";
import {CreatCard} from "@/application/services/dto/create-card.dto";


export interface CardApiInterface {
    fetchCards(): Promise<Card[]>;
    fetchCardsByTags(tags: string[]): Promise<Card[]>;
    fetchCardOfTheDay(): Promise<Card[]>;
    fetchCardById(cardId: CardId): Promise<Card>;
    createCard(creatCard: CreatCard): Promise<void>;
    updateCard(card: Card): Promise<void>;
    deleteCard(cardId: CardId): Promise<void>;
    answerCard(cardId: CardId, isValid: boolean): Promise<void>;
}